const express = require("express");
const mongoose = require('mongoose');
const restaurantesRoutes = require('./routes/restaurantes.js');
//const usuariosRoutes = require('./routes/usuarios');
const comentariosRoutes = require('./routes/comentarios.js');
const path = require("path");


// swagger
/*const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { version } = require("os");
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node MongoDB API",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:9000"
      }
    ]
  },
  apis: ['${path.join__dirname, "./routes/*.js"}']
}
*/

const app = express();
app.use(express.json());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/TattlerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

//middlewares
/*app.use(express.json());
app.use("/api", restaurantesRoutes, comentariosRoutes);

app.use("/api-doc", swaggerUI.server, swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
*/

  // Usar rutas
app.use('/restaurantes', restaurantesRoutes);
app.use('/comentarios', comentariosRoutes);
//app.use('/usuarios', usuariosRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
