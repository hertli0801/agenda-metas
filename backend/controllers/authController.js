const bcrypt = require('bcryptjs');

// Simulación de la base de datos en memoria (temporal)
const usuariosMock = [];

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

    // 3. Validación de QA: Contraseña débil (mínimo 6 caracteres)
    if (contraseña.length < 6) {
        return res.status(400).json({ 
            ok: false, 
            msg: 'La contraseña debe tener al menos 6 caracteres.' 
        });
    }

    try {
        // 4. Validar que el correo no esté repetido
        const existeUsuario = usuariosMock.find(user => user.correo === correo);
        if (existeUsuario) {
            return res.status(400).json({ 
                ok: false, 
                msg: 'Este correo electrónico ya se encuentra registrado.' 
            });
        }

        // 5. Encriptar la contraseña (Ciberseguridad)
        const salt = await bcrypt.genSalt(10);
        const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

        // 6. Guardar el nuevo usuario en el mock
        const nuevoUsuario = {
            id: usuariosMock.length + 1,
            nombre,
            correo,
            contraseña: contraseñaEncriptada
        };
        usuariosMock.push(nuevoUsuario);

        console.log('Usuarios en memoria actualizados:', usuariosMock);

        // 7. Respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente.',
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                correo: nuevoUsuario.correo
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            ok: false, 
            msg: 'Error en el servidor. Contacte al administrador.' 
        });
    }
};

module.exports = {
    registrarUsuario
};