const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/authController');

// Definir la ruta POST para registro: /api/auth/register
router.post('/register', registrarUsuario);

module.exports = router;