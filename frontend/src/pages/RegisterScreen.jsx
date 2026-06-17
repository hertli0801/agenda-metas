import React, { useState } from "react";

export default function RegisterScreen({ onRegister, onNavigateLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name) newErrors.name = "El nombre completo es obligatorio.";
    if (!email) newErrors.email = "El correo es obligatorio.";
    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener mínimo 8 caracteres.";
    }
    if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onRegister(name);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-7">
      <div className="space-y-6 mt-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Crear Cuenta</h1>
          <p className="text-sm text-slate-500 font-medium">Comienza a alcanzar tus metas hoy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Nombre Completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre completo" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all" />
            {errors.name && <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1 mt-1">⚠️ {errors.name}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all" />
            {errors.email && <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1 mt-1">⚠️ {errors.email}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Contraseña (mínimo 8 caracteres)</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all" />
            {errors.password && <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1 mt-1">⚠️ {errors.password}</span>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Confirmar Contraseña</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite tu contraseña" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all" />
            {errors.confirmPassword && <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1 mt-1">⚠️ {errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="w-full py-4 bg-[#5f56d6] hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl transition-all shadow-lg">Registrarme</button>
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-sm text-slate-400 font-medium">
          ¿Ya tienes cuenta? <button onClick={onNavigateLogin} className="font-bold text-[#5f56d6] hover:underline">Ya tengo cuenta</button>
        </p>
      </div>
    </div>
  );
}