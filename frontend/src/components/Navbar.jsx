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
