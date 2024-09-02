const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const { nombre, email, contraseña, rol } = req.body;

    // Validación básica
    if (!nombre || !email || !contraseña) {
        return res.status(400).json({ error: 'Datos de usuario inválidos' });
    }

    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo usuario con la contraseña encriptada
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            contraseña: hashedPassword,
            rol: rol || 'usuario'
        });

        // Guardar el usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'El email ya está registrado' });
        } else {
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    }
};
