import React, { useState } from "react";

export default function LoginScreen({ onLogin, onNavigateRegister, onNavigateForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = "El correo es obligatorio.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const name = email.split("@")[0];
      onLogin(name.charAt(0).toUpperCase() + name.slice(1));
    }
  };

  return (
    <div className="flex flex-col h-full justify-between p-7">
      <div className="space-y-8 mt-12">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-black text-[#5f56d6] tracking-tight">GoalFlow</h1>
          <p className="text-base text-slate-500 font-medium">Bienvenido de nuevo</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 block">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) setErrors(prev => ({ ...prev, email: null }));
              }}
              placeholder="correo@ejemplo.com"
              className={`w-full px-5 py-4 bg-white border ${
                errors.email ? "border-[#f59e0b] ring-2 ring-amber-50" : "border-slate-200"
              } rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all`}
            />
            {errors.email && (
              <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1.5 mt-1">
                ⚠️ {errors.email}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 block">Contraseña</label>
              <button type="button" onClick={onNavigateForgot} className="text-xs font-bold text-[#5f56d6] hover:underline">
                ¿Olvidaste contraseña?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value) setErrors(prev => ({ ...prev, password: null }));
              }}
              placeholder="••••••••"
              className={`w-full px-5 py-4 bg-white border ${
                errors.password ? "border-[#f59e0b] ring-2 ring-amber-50" : "border-slate-200"
              } rounded-2xl text-sm focus:outline-none focus:border-[#5f56d6] transition-all`}
            />
            {errors.password && (
              <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-1.5 mt-1">
                ⚠️ {errors.password}
              </span>
            )}
          </div>

          <button type="submit" className="w-full py-4 bg-[#5f56d6] hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl transition-all shadow-lg">
            Iniciar Sesión
          </button>
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-sm text-slate-400 font-medium">
          ¿No tienes cuenta? <button onClick={onNavigateRegister} className="font-bold text-[#5f56d6] hover:underline">Crear Cuenta</button>
        </p>
      </div>
    </div>
  );
}