import React, { useState } from "react";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/RegisterScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import DashboardScreen from "./pages/DashboardScreen";
import NewGoalScreen from "./pages/NewGoalScreen";
import ProfileScreen from "./pages/ProfileScreen";
import GoalDetailScreen from "./pages/GoalDetailScreen";

export default function App() {
  // Manejo de la pantalla actual: 'login', 'register', 'forgot', 'dashboard', 'new-goal', 'profile', 'detail'
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Datos de prueba para evitar que el renderizado falle por valores undefined
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Terminar Frontend de GoalFlow",
      description: "Maquetar todas las vistas usando React y Tailwind CSS conforme al diseño de Figma.",
      dueDate: "2026-06-30",
      category: "Estudio",
      progress: 75,
      status: "En progreso"
    },
    {
      id: 2,
      title: "Ahorrar para la suscripción",
      description: "Separar dinero mensualmente.",
      dueDate: "2026-07-15",
      category: "Finanzas",
      progress: 100,
      status: "Completada"
    }
  ]);

  // Cálculos dinámicos de estadísticas
  const activeGoals = goals.filter(g => g.status !== "Completada").length;
  const completedGoals = goals.filter(g => g.status === "Completada").length;
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
    setUser("");
    setScreen("login");
  };

  // Handlers de Metas
  const handleSaveGoal = (newGoalData) => {
    const newGoal = {
      id: Date.now(),
      ...newGoalData,
      progress: 0,
      status: "En progreso"
    };
    setGoals([...goals, newGoal]);
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
    setGoals(goals.map(g => g.id === selectedGoal.id ? { ...g, progress: 100, status: "Completada" } : g));
    setScreen("dashboard");
  };

  const handleDeleteGoal = () => {
    setGoals(goals.filter(g => g.id !== selectedGoal.id));
    setScreen("dashboard");
  };

  // Contenedor simulador de teléfono celular (Centrado y estético)
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-indigo-100">
      <div className="w-full max-w-[412px] h-[844px] bg-white rounded-none sm:rounded-[40px] shadow-2xl overflow-hidden border border-slate-800 flex flex-col relative">
        
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