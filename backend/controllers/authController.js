const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Conexión a MariaDB

// === REGISTRO DE USUARIO ===
const registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'Todos los campos (nombre, correo, contraseña) son obligatorios.' 
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'El formato del correo electrónico no es válido.' 
        });
    }

    if (contraseña.length < 6) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'La contraseña debe tener al menos 6 caracteres.' 
        });
    }

    try {
        const [usuarioExistente] = await db.query('SELECT * FROM Usuario WHERE Correo = ?', [correo]);
        
        if (usuarioExistente.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo electrónico ya se encuentra registrado.'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        const [resultado] = await db.query(
            'INSERT INTO Usuario (Nombre, Correo, Contrasena) VALUES (?, ?, ?)',
            [nombre, correo, contraseñaEncriptada]
        );

        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente en MariaDB.',
            usuario: {
                id: resultado.insertId,
                nombre,
                correo
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el servidor al registrar. Contacte al administrador.' 
        });
    }
};

// === INICIO DE SESIÓN (LOGIN) ===
const loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;

    // 1. Validación de QA: Campos vacíos
    if (!correo || !contraseña) {
        return res.status(400).json({
            ok: false,
            msg: 'Por favor, proporcione correo y contraseña.'
        });
    }

    try {
        // 2. Buscar al usuario en MariaDB por su correo
        const [usuarios] = await db.query('SELECT * FROM Usuario WHERE Correo = ?', [correo]);
        
        if (usuarios.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas (correo o contraseña no válidos).'
            });
        }

        const usuario = usuarios[0];

        // 3. Validación de QA: Verificar si el usuario está activo
        if (usuario.Estatus_Activo !== 1) {
            return res.status(403).json({
                ok: false,
                msg: 'Tu cuenta está desactivada. Contacta al administrador.'
            });
        }

        // 4. Comparar la contraseña ingresada con el Hash encriptado de la BD
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.Contrasena);
        
        if (!contraseñaValida) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas (correo o contraseña no válidos).'
            });
        }

        // 5. Respuesta exitosa si todo coincide
        return res.status(200).json({
            ok: true,
            msg: 'Inicio de sesión exitoso.',
            usuario: {
                id: usuario.ID_Usuario,
                nombre: usuario.Nombre,
                correo: usuario.Correo
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor al iniciar sesión.'
        });
    }
};

// Exportamos ambos métodos para que las rutas los usen
module.exports = {
    registrarUsuario,
    loginUsuario
};