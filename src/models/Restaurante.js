const mongoose = require('mongoose');

const restauranteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    contacto: {
        telefono: { type: String, /*required: true*/ },
        correo: { type: String, /*required: true*/ },
        ubicacion: { type: [Number], required: true } // [longitude, latitude]
    },
    estrellas: { type: Number, min: 1, max: 5 },
    categorias: [String],
    fechaCreacion: { type: Date, default: Date.now },
    cantidadReviews: { type: Number, default: 0 },
    ranking: { type: Number, default: 0 },
    totalPuntuaciones: { type: Number, default: 0 }
});

const Restaurante = mongoose.model('Restaurante', restauranteSchema);

module.exports = Restaurante;
