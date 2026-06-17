import React, { useState } from "react";

export default function NewGoal({ onSaveGoal, onCancel }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(""); // HU 09: Almacena la fecha seleccionada
  const [category, setCategory] = useState("Estudio");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    // Transforma la fecha a formato legible DD/MM/AAAA
    const formattedDate = dueDate.split("-").reverse().join("/");
    
    onSaveGoal({ title, category, dueDate: formattedDate });
  };

  return (
    <div className="flex flex-col h-full justify-between bg-white">
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onCancel} className="text-xl p-1 hover:bg-slate-50 rounded-full">←</button>
          <h2 className="text-xl font-bold text-slate-900">Nueva Meta</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-slate-800 block mb-2">Nombre de la Meta</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Estudiar estructura de datos"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500"
              required
            />
          </div>

          {/* HU 09: Input tipo fecha (Datepicker) */}
          <div>
            <label className="text-sm font-bold text-slate-800 block mb-2">Fecha Límite</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-indigo-500 text-slate-700"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-800 block mb-2">Categoría</label>
            <div className="grid grid-cols-2 gap-3">
              {["Estudio", "Finanzas"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    category === cat ? "border-indigo-500 bg-white ring-2 ring-indigo-50" : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <span className="text-sm font-bold text-slate-800">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="p-4 bg-white border-t border-slate-50">
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-[#5850ec] hover:bg-indigo-700 text-white font-bold text-base rounded-2xl transition-all shadow-md"
        >
          Guardar Meta
        </button>
      </div>
    </div>
  );
}