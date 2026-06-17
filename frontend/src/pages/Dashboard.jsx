import React from "react";
import Navbar from "../components/Navbar";

export default function Dashboard({ goals, setCurrentScreen, onDeleteGoal }) {
  // Cálculo dinámico del rendimiento general basado en las metas en memoria
  const porcentajeRendimiento = goals.length > 0 
    ? Math.round(goals.reduce((acc, curr) => acc + curr.progress, 0) / goals.length) 
    : 0;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="p-6 space-y-6 overflow-y-auto max-h-[740px]">
        
        {/* Header de bienvenida */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Hola, Fernanda</h2>
          <p className="text-sm text-slate-500 mt-1">Sigue así, vas muy bien 💪</p>
        </div>

        {/* Gráfico de rendimiento */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xs flex items-center gap-6">
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#4f46e5]" strokeDasharray={`${porcentajeRendimiento}, 100`} strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-xl font-extrabold text-slate-900">{porcentajeRendimiento}%</div>
          </div>
          <div className="text-xs text-slate-500">
            <p className="font-bold text-slate-800 text-sm">Tu rendimiento general</p>
            <p className="mt-1">Has completado un promedio del {porcentajeRendimiento}% de tus objetivos.</p>
          </div>
        </div>

        {/* Listado de Metas (HU 07: Control de Estado Vacío) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Mis Metas</h3>
          
          {goals.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-2">
              <span className="text-4xl block">✨</span>
              <p className="text-sm font-bold text-slate-700">No tienes metas registradas</p>
              <p className="text-xs text-slate-400">Presiona el botón "+" inferior para empezar.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3 relative">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                        goal.category === "Estudio" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {goal.category === "Estudio" ? "📘" : "💲"}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{goal.title}</h4>
                        {/* HU 09: Fecha Límite visible en tarjeta */}
                        <p className="text-xs text-slate-400">📅 Límite: {goal.dueDate}</p>
                      </div>
                    </div>
                    
                    {/* HU 06: Accionador para eliminar meta */}
                    <button 
                      onClick={() => onDeleteGoal(goal)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#5850ec] h-full rounded-full" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-medium">{goal.category}</span>
                    <span className="font-bold text-indigo-600">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Navbar activeTab="inicio" setCurrentScreen={setCurrentScreen} />
    </div>
  );
}