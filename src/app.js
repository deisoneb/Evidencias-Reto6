const express = require("express");
const mongoose = require('mongoose');
const restaurantesRoutes = require('./routes/restaurantes.js');
const comentariosRoutes = require('./routes/comentarios.js');
const usuariosRoutes = require("./routes/usuarios.js");


// Importar configuración de Swagger
const { swaggerSpec, swaggerUi } = require('./config/swagger');



const app = express();
app.use(express.json());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/TattlerDB', {
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

// Configurar Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar rutas
app.use('/restaurantes', restaurantesRoutes);
app.use('/comentarios', comentariosRoutes);
app.use('/usuarios', usuariosRoutes)





// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;