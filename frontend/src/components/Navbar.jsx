<<<<<<< HEAD
import React from "react";

export default function Navbar({ activeTab, onNavigate }) {
  return (
    <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-between px-12 shrink-0 relative">
      <button onClick={() => onNavigate("dashboard")} className={`flex flex-col items-center gap-1 ${activeTab === "inicio" ? "text-[#5f56d6]" : "text-slate-400"}`}>
        <span className="text-xl">🏠</span>
        <span className="text-[11px] font-extrabold">Inicio</span>
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 -top-5">
        <button onClick={() => onNavigate("new-goal")} className="w-14 h-14 bg-[#5f56d6] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-100">+</button>
      </div>

      <button onClick={() => onNavigate("profile")} className={`flex flex-col items-center gap-1 ${activeTab === "perfil" ? "text-[#5f56d6]" : "text-slate-400"}`}>
        <span className="text-xl">👤</span>
        <span className="text-[11px] font-extrabold">Perfil</span>
      </button>
    </div>
  );
}
=======
import React from 'react';

export default function Navbar({ onAddClick }) {
  return (
    <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around z-20">
      {/* Botón: Inicio */}
      <button className="flex flex-col items-center text-slate-400 hover:text-indigo-500 transition-colors">
        <span className="text-lg">🏠</span>
        <span className="text-[9px] mt-0.5">Inicio</span>
      </button>

      {/* Botón Flotante "+" (Metas) */}
      <div className="relative -top-4">
        <button 
          onClick={onAddClick}
          className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transform hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-2xl font-semibold">+</span>
        </button>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400 font-medium whitespace-nowrap">Metas</span>
      </div>

      {/* Botón: Perfil (Activo) */}
      <button className="flex flex-col items-center text-indigo-600">
        <span className="text-lg">👤</span>
        <span className="text-[9px] mt-0.5 font-semibold">Perfil</span>
      </button>
    </div>
  );
}
>>>>>>> origin/develop
