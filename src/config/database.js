const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in the environment variables');
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            // Opciones de conexión si son necesarias
        });
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
};

module.exports = connectDB;