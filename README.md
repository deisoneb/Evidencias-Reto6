# Evidencias-Reto6
# Proyecto de API de Restaurantes

Este proyecto es una API RESTful para gestionar información sobre restaurantes, comentarios y usuarios.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Swagger para documentación de API

## Instalación de las dependencias

npm init -y
npm install express mongoose swagger-jsdoc swagger-ui-express
npm install --save-dev nodemon

3. Asegúrate de tener MongoDB instalado y corriendo en tu máquina local.

4. Inicia el servidor:
nodemon app

El servidor se iniciará en `http://localhost:3000`.

## Estructura del proyecto

- `app.js`: Punto de entrada de la aplicación
- `routes/`: Contiene las rutas de la API
- `/controllers/restaurantesController.js`: Rutas para gestionar restaurantes
- `/controllers/comentariosController.js`: Rutas para gestionar comentarios
- `/controllers/usuariosController.js`: Rutas para gestionar usuarios
- `/config/swagger.js`: Configuración de Swagger para la documentación de la API

## Endpoints de la API

- `/routes/restaurantes.js`: Operaciones CRUD para restaurantes
- `/routes/comentarios.js`: Operaciones CRUD para comentarios
- `/routes/usuarios.js`: Operaciones CRUD para usuarios

Para una documentación detallada de los endpoints, visita la ruta `/api-docs` una vez que el servidor esté corriendo.

## Documentación de la API

La documentación de la API está disponible a través de Swagger UI. Para acceder a ella, inicia el servidor y visita:

http://localhost:3000/api-docs

