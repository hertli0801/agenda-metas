import React, { useState } from "react";

export default function NewGoalScreen({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Estudio");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    onSave({ title, description, dueDate, category });
  };

  return (
    <div className="flex flex-col h-full justify-between bg-white">
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full bg-slate-50">←</button>
          <h2 className="text-xl font-black text-slate-900">Nueva Meta</h2>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Nombre de la Meta</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="¿Cuál es tu meta?" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6]" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Descripción</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe tu meta..." rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6] resize-none" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">Fecha Límite</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#5f56d6]" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500">Categoría</label>
            <div className="grid grid-cols-2 gap-3">
              {["Estudio", "Finanzas", "Salud", "Personal"].map((cat) => (
                <button key={cat} type="button" onClick={() => setCategory(cat)} className={`p-3.5 rounded-2xl border flex flex-col items-center gap-0.5 ${category === cat ? "border-[#5f56d6] bg-white ring-2 ring-indigo-50" : "border-slate-100 bg-slate-50"}`}>
                  <span className="text-base">{cat === "Estudio" ? "📘" : cat === "Finanzas" ? "💲" : cat === "Salud" ? "❤️" : "⭐"}</span>
                  <span className="text-xs font-bold text-slate-800">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
      <div className="p-5 border-t border-slate-50">
        <button onClick={handleSubmit} className="w-full py-4 bg-[#5f56d6] text-white font-extrabold text-base rounded-2xl shadow-md">Guardar Meta</button>
      </div>
    </div>
  );
}