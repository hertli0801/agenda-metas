const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Importamos la conexión real a MariaDB

const registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    // 1. Validación de QA: Campos vacíos
    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'Todos los campos (nombre, correo, contraseña) son obligatorios.' 
        });
    }

    // 2. Validación de QA: Formato de correo básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'El formato del correo electrónico no es válido.' 
        });
    }

    // 3. Validación de QA: Contraseña débil
    if (contraseña.length < 6) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'La contraseña debe tener al menos 6 caracteres.' 
        });
    }

    try {
        // 4. Validar si el correo ya existe en MariaDB
        const [usuarioExistente] = await db.query('SELECT * FROM Usuario WHERE Correo = ?', [correo]);
        
        if (usuarioExistente.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Este correo electrónico ya se encuentra registrado.'
            });
        }

        // 5. Encriptar la contraseña (Ciberseguridad)
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        // 6. Insertar el nuevo usuario en MariaDB
        // Ojo: Usamos "Contrasena" sin la "ñ" tal cual se mapeó en tu script de base de datos
        const [resultado] = await db.query(
            'INSERT INTO Usuario (Nombre, Correo, Contrasena) VALUES (?, ?, ?)',
            [nombre, correo, contraseñaEncriptada]
        );

        // 7. Respuesta exitosa con persistencia real
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

module.exports = {
    registrarUsuario
};