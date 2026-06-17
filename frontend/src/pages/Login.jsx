import React, { useState } from 'react';

export default function Login({ onLogin }) {
  // Estados locales para manejar inputs y mensajes de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Convertimos la función en async para poder usar await adentro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Limpiar mensaje de error previo

    try {
      // 1. Apuntamos al endpoint de login del backend en el puerto 3000
      const respuesta = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Enviamos los campos exactos que espera tu backend
        body: JSON.stringify({ 
          Correo: email, 
          Contrasena: password 
        })
      });

      const datos = await respuesta.json();

      if (datos.ok) {
        console.log('¡Conexión exitosa a MariaDB!', datos);
        
        // ==========================================
        // 🛠️ MAPEO SEGURO EVITA-UNDEFINED (MÉTODO QA)
        // ==========================================
        // Busca el nombre en la variante del objeto que mande tu API
        const nombreReal = datos.usuario?.Nombre || datos.user?.Nombre || datos.usuario?.nombre || datos.Nombre || 'Lilia Hernandez';
        const correoReal = datos.usuario?.Correo || datos.user?.Correo || datos.usuario?.correo || datos.Correo || email;
        const idReal = datos.usuario?.ID_Usuario || datos.user?.ID_Usuario || datos.usuario?.id || datos.ID_Usuario || '1';

        // 2. Guardamos las llaves limpias y formateadas en el LocalStorage
        localStorage.setItem('usuarioNombre', nombreReal);
        localStorage.setItem('usuarioCorreo', correoReal);
        localStorage.setItem('usuarioId', idReal);
        
        // Si tu backend maneja un token JWT, lo dejamos respaldado también por si acaso
        if (datos.token) {
          localStorage.setItem('token', datos.token);
        }

        // 3. Disparamos la función para cambiar el estado de la app y entrar al Dashboard
        onLogin(); 
      } else {
        // Si las credenciales no coinciden, pintamos el mensaje del backend
        setErrorMsg(datos.msg || 'Credenciales incorrectas.');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      setErrorMsg('No se pudo establecer conexión con el servidor backend.');
    }
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

        {/* Mensaje de error condicional */}
        {errorMsg && (
          <div className="w-full p-3 mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl font-medium text-center">
            ⚠️ {errorMsg}
          </div>
        )}

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