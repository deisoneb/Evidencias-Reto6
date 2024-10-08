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
                 required: true,
                 index: '2dsphere'
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

restauranteSchema.index({ 'ubicacion': '2dsphere' }); // Para consultas geoespaciales

const Restaurante = mongoose.model('Restaurante', restauranteSchema);

module.exports = Restaurante;
