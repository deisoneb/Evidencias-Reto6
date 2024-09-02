const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: { type: String },
    autor: { type: String, required: true },
    restauranteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
    puntuacion: { type: Number, min: 1, max: 5, required: true },
    fecha: { type: Date, default: Date.now }
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
