const express = require('express');
const router = express.Router();
const restaurantesController = require('../controllers/restaurantesController.js');
const Restaurante = require('../models/Restaurante');

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurante:
 *       type: object
 *       required:
 *         - nombre
 *         - tipo
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-generado del restaurante
 *         nombre:
 *           type: string
 *           description: Nombre del restaurante
 *         tipo:
 *           type: string
 *           description: Tipo de cocina del restaurante (ej. "italiano", "japonés")
 *         contacto:
 *           type: object
 *           properties:
 *             telefono:
 *               type: string
 *               description: Teléfono del restaurante
 *             correo:
 *               type: string
 *               description: Correo electrónico del restaurante
 *             ubicacion:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   enum: ['Point']
 *                   description: Tipo de geometría (siempre 'Point' para ubicaciones)
 *                 coordinates:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: Coordenadas [longitud, latitud]
 *         estrellas:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Calificación del restaurante
 *         categorias:
 *           type: array
 *           items:
 *             type: string
 *           description: Categorías del restaurante
 *         fechaCreacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *         cantidadReviews:
 *           type: number
 *           description: Número de reseñas del restaurante
 *         ranking:
 *           type: number
 *           description: Posición en el ranking
 *         totalPuntuaciones:
 *           type: number
 *           description: Total de puntuaciones recibidas
 */


/**
 * @swagger
 * /restaurantes/cercanos:
 *   get:
 *     summary: Obtiene restaurantes cercanos basados en la ubicación del usuario
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: query
 *         name: latitud
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitud de la ubicación del usuario
 *       - in: query
 *         name: longitud
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitud de la ubicación del usuario
 *     responses:
 *       200:
 *         description: Lista de restaurantes cercanos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurante'
 *       400:
 *         description: Parámetros de ubicación faltantes o inválidos
 *       500:
 *         description: Error interno del servidor
 */
// Obtener restaurantes cercanos basados en la ubicación del usuario
router.get('/cercanos', restaurantesController.getLocation)

/**
 * @swagger
 * /restaurantes/tipo/{tipo}:
 *   get:
 *     summary: Obtener restaurantes por tipo de comida, ordenados por cercanía
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         schema:
 *           type: string
 *         required: true
 *         description: Tipo de comida o categoría
 *       - in: query
 *         name: latitud
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitud de la ubicación del usuario
 *       - in: query
 *         name: longitud
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitud de la ubicación del usuario
 *     responses:
 *       200:
 *         description: Lista de restaurantes del tipo especificado, ordenados por cercanía
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurante'
 *       400:
 *         description: Faltan parámetros de latitud y longitud
 *       404:
 *         description: No se encontraron restaurantes para la categoría especificada
 *       500:
 *         description: Error interno del servidor al obtener restaurantes por categoría
 */
router.get('/tipo/:tipo', restaurantesController.getMenu);


  
/**
 * @swagger
 * /restaurantes:
 *   get:
 *     summary: Obtiene todos los restaurantes
 *     tags: [Restaurantes]
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurante'
 *       500:
 *         description: Error al obtener los restaurantes
 */
router.get('/', restaurantesController.getRestaurante);

/**
 * @swagger
 * /restaurantes/{id}:
 *   get:
 *     summary: Obtiene un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Detalles del restaurante
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurante'
 *       404:
 *         description: Restaurante no encontrado
 *       500:
 *         description: Error al obtener el restaurante
 */
router.get('/:id', restaurantesController.getRestauranteById);

/**
 * @swagger
 * /restaurantes:
 *   post:
 *     summary: Crea un nuevo restaurante
 *     tags: [Restaurantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurante'
 *     responses:
 *       201:
 *         description: Restaurante creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error al crear el restaurante
 */
router.post('/', restaurantesController.createRestaurante);

/**
 * @swagger
 * /restaurantes/{id}:
 *   put:
 *     summary: Actualiza un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurante'
 *     responses:
 *       200:
 *         description: Restaurante actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Restaurante no encontrado
 *       500:
 *         description: Error al actualizar el restaurante
 */
router.put('/:id', restaurantesController.updateRestaurante);

/**
 * @swagger
 * /restaurantes/{id}:
 *   delete:
 *     summary: Elimina un restaurante por ID
 *     tags: [Restaurantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Restaurante eliminado exitosamente
 *       404:
 *         description: Restaurante no encontrado
 *       500:
 *         description: Error al eliminar el restaurante
 */
router.delete('/:id', restaurantesController.deleteRestaurante);




module.exports = router;
