import React from "react";

export default function Navbar({ activeTab, setCurrentScreen }) {
  return (
    <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-between px-12 shrink-0 relative">
      <button onClick={() => setCurrentScreen("dashboard")} className={`flex flex-col items-center gap-1 ${activeTab === "inicio" ? "text-[#5850ec]" : "text-slate-400"}`}>
        <span className="text-xl">🏠</span>
        <span className="text-[11px] font-bold">Inicio</span>
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 -top-5">
        <button onClick={() => setCurrentScreen("new-goal")} className="w-14 h-14 bg-[#5850ec] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-100">+</button>
      </div>

      <div className="text-slate-400 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xl">👤</span>
        <span className="text-[11px] font-bold">Perfil</span>
      </div>
    </div>
  );
}