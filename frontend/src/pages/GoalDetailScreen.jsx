import React from "react";

export default function GoalDetailScreen({ goal, onBack, onUpdateProgress, onTriggerComplete, onTriggerDelete }) {
  return (
    <div className="flex flex-col h-full justify-between bg-slate-50">
      <div className="p-6 space-y-6 overflow-y-auto max-h-[740px] flex-grow">
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-extrabold text-sm">
            <span>←</span> Detalle de Meta
          </button>
          <button onClick={onTriggerDelete} className="w-9 h-9 bg-red-50 text-red-500 rounded-full flex items-center justify-center hover:bg-red-100 transition-all">🗑️</button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#5f56d6]">{goal.category}</span>
            <h3 className="text-2xl font-black text-slate-900">{goal.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 block font-bold">Fecha límite</span>
              <span className="font-extrabold text-slate-700 mt-0.5 block">{goal.dueDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-bold">Estado</span>
              <span className={`font-extrabold mt-0.5 block ${goal.status === "Completada" ? "text-emerald-500" : "text-indigo-600"}`}>
                {goal.status === "Completada" ? "✓ Completada" : "En progreso"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400">Descripción</span>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{goal.description}</p>
          </div>

          {goal.status !== "Completada" && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-400">Progreso</span>
                <span className="text-[#5f56d6]">{goal.progress}%</span>
              </div>
              <input type="range" min="0" max="100" step="5" value={goal.progress} onChange={(e) => onUpdateProgress(Number(e.target.value))} className="w-full accent-[#5f56d6]" />
            </div>
          )}
        </div>
      </div>

      {goal.status !== "Completada" && (
        <div className="p-5 bg-white border-t border-slate-100">
          <button onClick={onTriggerComplete} className="w-full py-4 bg-emerald-500 text-white font-extrabold text-base rounded-2xl shadow-md">
            ✓ Completar Meta
          </button>
        </div>
      )}
    </div>
  );
}