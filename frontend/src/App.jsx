import React, { useState } from 'react';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateGoalModal from './components/CreateGoalModal';

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login' o 'profile'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGoalsCount, setActiveGoalsCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Se activa cuando el modal de metas hace el POST con éxito
  const handleSaveGoal = (newGoalData) => {
    // 1. Incrementar el contador de metas en el Dashboard
    setActiveGoalsCount((prev) => prev + 1);

    // 2. Cerrar el modal
    setIsModalOpen(false);

    // 3. Lanzar notificación visual flotante
    setToastMessage(`Meta "${newGoalData.title || 'Nueva meta'}" creada con éxito.`);
    setTimeout(() => setToastMessage(''), 3000); // Se oculta tras 3 segundos
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Contenedor simulador móvil */}
      <div className="w-[375px] h-[780px] bg-slate-50 shadow-2xl rounded-[40px] border-[12px] border-slate-800 overflow-hidden relative">
        
        {/* Renderizado de pantallas */}
        {screen === 'login' ? (
          <Login onLogin={() => setScreen('profile')} />
        ) : (
          <Profile 
            activeGoalsCount={activeGoalsCount} 
            onAddClick={() => setIsModalOpen(true)}
            onLogout={() => {
              setScreen('login');
              setActiveGoalsCount(0); // Resetea metas al salir
            }}
          />
        )}

        {/* Modal interactivo de la HU 04 */}
        <CreateGoalModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGoal}
        />

        {/* Notificación Toast Flotante */}
        {toastMessage && (
          <div className="absolute top-4 inset-x-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="text-emerald-400 font-bold">✔️</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}