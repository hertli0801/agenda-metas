const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); // Asegura que la conexión a la base de datos se establezca al iniciar el servidor

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON (crucial para APIs)

// --- CONEXIÓN DE RUTAS ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/meta', require('./routes/metaRoutes'));


// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('¡Servidor de la Agenda de Metas corriendo con éxito!');
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});