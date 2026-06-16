import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Simula autenticación exitosa
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] justify-center px-6">
      <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex flex-col items-center">
        
        {/* Logo GoalFlow */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-xs font-bold">GF</span>
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">GoalFlow</span>
        </div>
        <p className="text-xs text-slate-400 mb-6">Bienvenido de nuevo</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Input: Correo */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-500 mb-1">Correo electrónico</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                ✉️
              </span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-300 text-slate-800"
                placeholder="tu@correo.com"
                required
              />
            </div>
          </div>

          {/* Input: Contraseña */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-500">Contraseña</label>
              <a href="#" className="text-xs text-indigo-600 font-medium hover:underline">¿Olvidaste contraseña?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                🔒
              </span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-300 text-slate-800"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Botón Iniciar Sesión */}
          <button 
            type="submit" 
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6">
          ¿No tienes cuenta? <a href="#" className="text-indigo-600 font-semibold hover:underline">Crear cuenta</a>
        </p>
      </div>
    </div>
  );
}
