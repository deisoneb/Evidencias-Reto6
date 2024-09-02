const Comentario = require('../models/Comentario.js');
const Restaurante = require('../models/Restaurante.js');

// Crear varios comentarios
exports.createComentarios = async (req, res) => {
    const comentarios = req.body;

    // Verificar que el cuerpo de la solicitud sea un array
    if (!Array.isArray(comentarios) || comentarios.length === 0) {
        return res.status(400).json({ error: "Debe enviar un array de comentarios" });
    }

    // Validar cada comentario en el array
    for (let comentario of comentarios) {
        const { texto, autor, restauranteId, puntuacion } = comentario;

        if (!autor || !restauranteId || typeof puntuacion !== 'number' || puntuacion < 1 || puntuacion > 5) {
            return res.status(400).json({ error: "Datos de comentario inválidos", comentario });
        }
    }

    try {
        // Guardar todos los comentarios y actualizar los restaurantes correspondientes
        const comentariosGuardados = [];

        for (let comentario of comentarios) {
            const nuevoComentario = new Comentario(comentario);
            await nuevoComentario.save();

            // Buscar el restaurante por ID
            const restaurante = await Restaurante.findById(comentario.restauranteId);
            if (!restaurante) {
                return res.status(404).json({ error: `Restaurante no encontrado para ID: ${comentario.restauranteId}` });
            }

            // Actualizar el ranking del restaurante
            restaurante.totalPuntuaciones += comentario.puntuacion;
            restaurante.cantidadReviews += 1;
            restaurante.ranking = restaurante.totalPuntuaciones / restaurante.cantidadReviews;
            await restaurante.save();

            comentariosGuardados.push(nuevoComentario);
        }

        res.status(201).json({
            message: `${comentariosGuardados.length} comentarios agregados exitosamente`,
            comentarios: comentariosGuardados
        });
    } catch (error) {
        console.error("Error al agregar comentarios:", error);
        res.status(500).json({ error: "Error al agregar comentarios" });
    }
};



// Obtener comentarios por restaurante
exports.getComentariosByRestaurante = async (req, res) => {
    try {
        const comentarios = await Comentario.find({ restauranteId: req.params.restauranteId });
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener comentarios" });
    }
};
