const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

// 🌟 LA RUTA QUE FALTA: Endpoint para obtener todas las metas
// Cuando el front haga fetch('http://localhost:3000/api/meta'), responderá esto
router.get('/', async (req, res) => {
    try {
        const db = require('../config/db');
        // Traemos todas las metas de la base de datos
        const [rows] = await db.query('SELECT * FROM Meta');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error al obtener metas de MariaDB.' });
    }
});

// Tus rutas actuales de POST, PUT y DELETE que ya tenías listas:
router.post('/', metaController.crearMeta);
router.put('/:id', metaController.actualizarMeta);
router.delete('/:id', metaController.eliminarMeta);

// Endpoint de progreso del Dashboard (HU 10)
router.get('/progreso/:usuarioId', metaController.obtenerProgresoGeneral);

module.exports = router;