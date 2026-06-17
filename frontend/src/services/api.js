import axios from 'axios';

// ⚠️ Pon aquí el puerto exacto donde corre tu servidor Node.js/Express (ej: 5000, 3000)
const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const goalsService = {
  // Obtener todas las metas
  getAll: async () => {
    const response = await api.get('/metas'); 
    return response.data;
  },
  // Crear una nueva meta
  create: async (goalData) => {
    const response = await api.post('/metas', goalData);
    return response.data;
  },
  // Actualizar el progreso
  update: async (id, goalData) => {
    const response = await api.put(`/metas/${id}`, goalData);
    return response.data;
  },
  // Eliminar una meta
  delete: async (id) => {
    const response = await api.delete(`/metas/${id}`);
    return response.data;
  }
};

export default api;