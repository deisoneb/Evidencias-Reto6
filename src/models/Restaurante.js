const mongoose = require('mongoose'); 

const restauranteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true }, // Ej: "italiano", "japones", etc.
    contacto: {
        telefono: { type: String, /*required: true*/ },
        correo: { type: String, /*required: true*/ },
        ubicacion: {
            type: {
                type: [Number],
                enum: ['Point'],
                required: true
            },
            cordenadas: {
                type: [Number],
                required: true
            },
        }    
    },
    estrellas: { type: Number, min: 1, max: 5 },
    categorias: [String],
    fechaCreacion: { type: Date, default: Date.now },
    cantidadReviews: { type: Number, default: 0 },
    ranking: { type: Number, default: 0 },
    totalPuntuaciones: { type: Number, default: 0 }
});

restauranteSchema.index({ "contacto.ubicacion": "2dsphere" }); // Índice definido una sola vez

const Restaurante = mongoose.model('Restaurante', restauranteSchema);

module.exports = Restaurante;
