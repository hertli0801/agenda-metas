import React from "react";
import Navbar from "../components/Navbar";

export default function ProfileScreen({ user, stats, onLogout, onNavigate }) {
  return (
    <div className="flex flex-col h-full justify-between bg-slate-50">
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-black text-slate-900 text-center tracking-tight">PERFIL</h2>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 text-center space-y-3 shadow-xs">
          <div className="w-20 h-20 bg-indigo-50 text-[#5f56d6] rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">👤</div>
          <div>
            <h3 className="text-xl font-black text-slate-900">{user || "Fernanda Abascal"}</h3>
            <p className="text-xs text-slate-400 mt-0.5">fernanda@correo.com</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Estadísticas</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-2xl font-black text-[#5f56d6]">{stats.active}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Metas Activas</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="block text-2xl font-black text-emerald-500">{stats.completed}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Completadas</span>
            </div>
          </div>
        </div>

        <button onClick={onLogout} className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-extrabold text-base rounded-2xl transition-all shadow-md">
          Cerrar Sesión
        </button>
      </div>
      <Navbar activeTab="perfil" onNavigate={onNavigate} />
    </div>
  );
}