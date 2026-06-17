const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

// Mapeo de Endpoints vinculados a las HU 08 y HU 10
router.post('/', metaController.crearMeta);                         // Crear una meta
router.put('/:id', metaController.actualizarMeta);                 // Editar campos de la meta
router.patch('/:id/status', metaController.cambiarEstatusMeta);    // Marcar completada o cambiar estatus
router.delete('/:id', metaController.eliminarMeta);               // Eliminar meta por completo
router.get('/progreso/:usuarioId', metaController.obtenerProgresoGeneral); // Consultar progreso global (HU 10)

module.exports = router;