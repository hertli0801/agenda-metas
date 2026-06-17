import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import NewGoal from "./pages/NewGoal";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");
  const [goals, setGoals] = useState([
    { id: 1, title: "Aprender Inglés", progress: 65, category: "Estudio", dueDate: "14/08/2026" },
    { id: 2, title: "Ahorrar $5000", progress: 40, category: "Finanzas", dueDate: "30/12/2026" }
  ]);

  // HU 06: Estados para controlar la ventana de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);

  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), title: newGoal.title, progress: 0, category: newGoal.category, dueDate: newGoal.dueDate }
    ]);
    setCurrentScreen("dashboard");
  };

  // Abre el modal guardando la meta seleccionada
  const triggerDeleteModal = (goal) => {
    setGoalToDelete(goal);
    setIsModalOpen(true);
  };

  // Borra definitivamente la meta de la lista
  const confirmDeleteGoal = () => {
    setGoals((prev) => prev.filter((g) => g.id !== goalToDelete.id));
    setIsModalOpen(false);
    setGoalToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center sm:p-4">
      <div className="w-full max-w-[430px] h-[844px] bg-white shadow-2xl relative flex flex-col overflow-hidden sm:rounded-[40px]">
        
        <div className="flex-grow overflow-y-auto bg-[#f8fafc]">
          {currentScreen === "dashboard" && (
            <Dashboard goals={goals} setCurrentScreen={setCurrentScreen} onDeleteGoal={triggerDeleteModal} />
          )}
          {currentScreen === "new-goal" && (
            <NewGoal onSaveGoal={handleAddGoal} onCancel={() => setCurrentScreen("dashboard")} />
          )}
        </div>

        {/* HU 06: INTERFAZ INTERACTIVA DEL MODAL DE CONFIRMACIÓN */}
        {isModalOpen && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-[320px] text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-xl mx-auto">⚠️</div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">¿Eliminar meta?</h4>
                <p className="text-xs text-slate-400 mt-1">¿Estás seguro de que deseas eliminar "{goalToDelete?.title}"? Esta acción no se puede deshacer.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => setIsModalOpen(false)} className="py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">
                  Cancelar
                </button>
                <button onClick={confirmDeleteGoal} className="py-2.5 bg-red-500 text-white text-xs font-bold rounded-xl shadow-md">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}