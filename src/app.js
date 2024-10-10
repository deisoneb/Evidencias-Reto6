require('dotenv').config();
const express = require("express");
const restaurantesRoutes = require('./routes/restaurantes.js');
const comentariosRoutes = require('./routes/comentarios.js');
const usuariosRoutes = require("./routes/usuarios.js");

// Importar configuración de Swagger
const { swaggerSpec, swaggerUi } = require('./config/swagger');

// Importar la función de conexión a la base de datos
const connectDB = require('./config/database');

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar rutas
app.use('/restaurantes', restaurantesRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/usuarios', usuariosRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;