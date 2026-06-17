import React, { useState, useEffect } from "react";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import DashboardScreen from "./pages/DashboardScreen";
import NewGoalScreen from "./pages/NewGoalScreen";
import ProfileScreen from "./pages/ProfileScreen";
import GoalDetailScreen from "./pages/GoalDetailScreen";

export default function App() {
  // Control de navegación del simulador
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);

  // El estado de metas inicia vacío esperando a MariaDB
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🛠️ FUNCIÓN CORREGIDA: Sincronización exacta con las columnas de tu MariaDB
 const cargarMetasDesdeBD = async () => {
    const idUsuarioLogueado = localStorage.getItem("usuarioId");
    
    if (!idUsuarioLogueado) {
      console.warn("⚠️ QA Log: No se encontró 'usuarioId' en el localStorage.");
      return;
    }

    try {
      setLoading(true);
      console.log(`🔍 Petición GET enviada para usuario ID: ${idUsuarioLogueado}`);
      
      const respuesta = await fetch("http://localhost:3000/api/meta");
      const datos = await respuesta.json();
  
      // 🌟 ESTE LOG ES CRÍTICO: Nos dirá exactamente cómo vienen estructurados tus datos
      console.log("📦 DATOS CRUDOS QUE LLEGAN DEL BACKEND:", datos);
  
      // Si llega un arreglo directo
      let listaMetas = Array.isArray(datos) ? datos : [];
      
      // Si los datos vienen dentro de una propiedad (ej: datos.metas o datos.data)
      if (!Array.isArray(datos) && datos && typeof datos === 'object') {
        listaMetas = datos.metas || datos.data || Object.values(datos).find(Array.isArray) || [];
      }

      console.log("📋 Lista extraída para filtrar:", listaMetas);

      const metasMapeadas = listaMetas
        .filter(m => {
          // Log para comprobar si coinciden los IDs
          const coincide = parseInt(m.Creador_ID) === parseInt(idUsuarioLogueado);
          console.log(`Checking meta ID_Meta: ${m.ID_Meta}, Creador_ID en BD: ${m.Creador_ID}, Buscado: ${idUsuarioLogueado} -> ¿Coincide?: ${coincide}`);
          return coincide;
        })
        .map((m) => ({
          id: m.ID_Meta,
          title: m.Titulo,
          description: m.Descripcion || "Sin descripción asignada.",
          dueDate: m.Fecha_Limite,
          category: m.Categoria_ID === 1 ? "General" : m.Categoria_ID === 4 ? "Personal" : "Estudio", 
          progress: m.Porcentaje_Actual || 0, 
          status: m.Estatus || "En progreso" 
        }));
      
      console.log("✨ Metas finales inyectadas al estado:", metasMapeadas);
      setGoals(metasMapeadas);
    } catch (error) {
      console.error("❌ Error de red al conectar el GET:", error);
    } finally {
      setLoading(false);
    }
  };
  // Cargar metas automáticamente al entrar al Dashboard
  useEffect(() => {
    if (screen === "dashboard") {
      cargarMetasDesdeBD();
    }
  }, [screen]);

  // Cálculos reactivos de estadísticas globales basándose en las columnas mapeadas
  const activeGoals = goals.filter(g => g.status !== "Completada" && g.status !== "Terminado").length;
  const completedGoals = goals.filter(g => g.status === "Completada" || g.status === "Terminado").length;
  const totalProgress = goals.reduce((acc, curr) => acc + curr.progress, 0);
  const avgProgress = goals.length > 0 ? Math.round(totalProgress / goals.length) : 0;

  const stats = {
    active: activeGoals,
    completed: completedGoals,
    avgProgress: avgProgress
  };

  // Handlers de autenticación
  const handleLogin = (userName) => {
    setUser(userName);
    setScreen("dashboard");
  };

  const handleRegister = (userName) => {
    setUser(userName);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser("");
    setGoals([]);
    setScreen("login");
  };

  // Handler de persistencia al guardar una nueva meta
  const handleSaveGoal = () => {
    cargarMetasDesdeBD();
    setScreen("dashboard");
  };

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setScreen("detail");
  };

  const handleUpdateProgress = (newProgress) => {
    setGoals(goals.map(g => g.id === selectedGoal.id ? { ...g, progress: newProgress } : g));
    setSelectedGoal({ ...selectedGoal, progress: newProgress });
  };

  const handleCompleteGoal = () => {
    cargarMetasDesdeBD();
    setScreen("dashboard");
  };

  const handleDeleteGoal = () => {
    cargarMetasDesdeBD();
    setScreen("dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-indigo-100">
      <div className="w-full max-w-[412px] h-[844px] bg-white rounded-none sm:rounded-[40px] shadow-2xl overflow-hidden border border-slate-800 flex flex-col relative">
        
        {loading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 animate-pulse z-50" />
        )}

        {/* Renderizado Condicional de Pantallas */}
        {screen === "login" && (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateRegister={() => setScreen("register")} 
            onNavigateForgot={() => setScreen("forgot")} 
          />
        )}

        {screen === "register" && (
          <RegisterScreen 
            onRegister={handleRegister} 
            onNavigateLogin={() => setScreen("login")} 
          />
        )}

        {screen === "forgot" && (
          <ForgotPasswordScreen 
            onNavigateLogin={() => setScreen("login")} 
          />
        )}

        {screen === "dashboard" && (
          <DashboardScreen 
            user={user}
            goals={goals} 
            stats={stats}
            onSelectGoal={handleSelectGoal} 
            onNavigate={(target) => setScreen(target)} 
          />
        )}

        {screen === "new-goal" && (
          <NewGoalScreen 
            onSave={handleSaveGoal} 
            onCancel={() => setScreen("dashboard")} 
          />
        )}

        {screen === "profile" && (
          <ProfileScreen 
            user={user} 
            stats={stats} 
            onLogout={handleLogout} 
            onNavigate={(target) => setScreen(target)} 
          />
        )}

        {screen === "detail" && selectedGoal && (
          <GoalDetailScreen 
            goal={selectedGoal} 
            onBack={() => setScreen("dashboard")} 
            onUpdateProgress={handleUpdateProgress} 
            onTriggerComplete={handleCompleteGoal} 
            onTriggerDelete={handleDeleteGoal} 
          />
        )}

      </div>
    </div>
  );
}