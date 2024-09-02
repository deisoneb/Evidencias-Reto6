const Restaurante = require('../models/Restaurante.js');

// Crear un nuevo restaurante
exports.createRestaurante = async (req, res) => {
    try {
        const nuevoRestaurante = new Restaurante(req.body);
        await nuevoRestaurante.save();
        res.status(201).json(nuevoRestaurante);
    } catch (error) {
        res.status(500).json({ error: "Error al crear restaurante" });
    }
};

// Actualizar un restaurante
exports.updateRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(restaurante);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar restaurante" });
    }
};

// Eliminar un restaurante
exports.deleteRestaurante = async (req, res) => {
    try {
        await Restaurante.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar restaurante" });
    }
};

//obtener resturantes
exports.getRestaurante = async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().sort({ nombre: 1 }); // Ordenar alfabéticamente por nombre
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error); // Mostrar el error exacto
        res.status(500).json({ error: "Error al obtener los restaurantes" });
    }
};
