import React, { useState } from "react";

export default function NewGoalScreen({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Estudio"); // Mantiene el texto para la UI de Liz
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Diccionario para convertir el texto de Liz al Categoria_ID numérico que exige la BD
  const categoriaIdMap = {
    "Estudio": 1,
    "Finanzas": 2,
    "Salud": 3,
    "Personal": 4
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Validaciones del lado del cliente
    if (!title || !dueDate) {
      setErrorMsg("El nombre de la meta y la fecha límite son obligatorios.");
      return;
    }

    // 2. Recuperar el ID del usuario desde el LocalStorage
    const idUsuarioLogueado = localStorage.getItem("usuarioId");
    if (!idUsuarioLogueado) {
      setErrorMsg("Sesión expirada. Por favor, vuelve a iniciar sesión.");
      return;
    }

    setLoading(true);

    // Obtener la fecha actual en formato AAAA-MM-DD para Fecha_Inicio
    const fechaHoy = new Date().toISOString().split('T')[0];

    try {
      // 3. Petición POST con el mapeo exacto que extrae tu metaController.js
      const respuesta = await fetch("http://localhost:3000/api/meta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Creador_ID: parseInt(idUsuarioLogueado),
          Responsable_ID: parseInt(idUsuarioLogueado),
          Categoria_ID: categoriaIdMap[category] || 1, // Convierte el texto a Número (1, 2, 3, 4)
          Titulo: title,
          Descripcion: description,
          Prioridad: "Media", // Valor por defecto estándar
          Fecha_Inicio: fechaHoy,
          Fecha_Limite: dueDate
        }),
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        console.log("¡Meta guardada con éxito en MariaDB!", datos);
        
        // 4. Notificamos al flujo global de App.jsx
        if (onSave) {
          onSave({ title, description, dueDate, category }); 
        }
      } else {
        setErrorMsg(datos.msg || datos.message || "No se pudo guardar la meta.");
      }
    } catch (error) {
      console.error("Error al conectar con la API de metas:", error);
      setErrorMsg("No se pudo establecer conexión con el backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between bg-white text-slate-800">
      <div className="p-6 space-y-5 overflow-y-auto">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={onCancel} 
            disabled={loading}
            className="text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-700 active:scale-95 transition-all"
          >
            ←
          </button>
          <h2 className="text-xl font-black text-slate-900">Nueva Meta</h2>
        </div>

        {/* Banner de error dinámico */}
        {errorMsg && (
          <div className="w-full p-3.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-2xl text-center">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Nombre de la Meta</label>
            <input 
              type="text" 
              value={title} 
              disabled={loading}
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="¿Cuál es tu meta?" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6] text-slate-800" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Descripción</label>
            <textarea 
              value={description} 
              disabled={loading}
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe tu meta..." 
              rows="3" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6] resize-none text-slate-800" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Fecha Límite</label>
            <input 
              type="date" 
              value={dueDate} 
              disabled={loading}
              onChange={(e) => setDueDate(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6] text-slate-700" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Categoría</label>
            <div className="grid grid-cols-2 gap-3">
              {["Estudio", "Finanzas", "Salud", "Personal"].map((cat) => (
                <button 
                  key={cat} 
                  type="button" 
                  disabled={loading}
                  onClick={() => setCategory(cat)} 
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-0.5 transition-all ${
                    category === cat 
                      ? "border-[#5f56d6] bg-white ring-2 ring-indigo-50" 
                      : "border-slate-100 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-base">{cat === "Estudio" ? "📘" : cat === "Finanzas" ? "💲" : cat === "Salud" ? "❤️" : "⭐"}</span>
                  <span className="text-xs font-bold text-slate-800">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
      
      <div className="p-5 border-t border-slate-50 bg-white">
        <button 
          type="submit"
          onClick={handleSubmit} 
          disabled={loading}
          className={`w-full py-4 ${loading ? "bg-indigo-400" : "bg-[#5f56d6] hover:bg-indigo-700"} text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-[0.99]`}
        >
          {loading ? "Guardando en Base de Datos..." : "Guardar Meta"}
        </button>
      </div>
    </div>
  );
}