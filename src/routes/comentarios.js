const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentariosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       required:
 *         - texto
 *         - autor
 *         - restauranteId
 *         - puntuacion
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del comentario generado por MongoDB
 *         texto:
 *           type: string
 *           description: El contenido del comentario
 *         autor:
 *           type: string
 *           description: Nombre del autor del comentario
 *         restauranteId:
 *           type: string
 *           description: ID del restaurante asociado al comentario
 *         puntuacion:
 *           type: number
 *           description: Puntuación del comentario (1-5)
 *         fecha:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de creación del comentario
 *         __v:
 *           type: number
 *           description: Versión del documento (usado por MongoDB)
 */

/**
 * @swagger
 * /comentarios/{restauranteId}:
 *   get:
 *     summary: Obtiene todos los comentarios de un restaurante específico
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: restauranteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Lista de comentarios del restaurante
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       404:
 *         description: No se encontraron comentarios para este restaurante
 */
router.get('/:restauranteId', comentarioController.getComentariosByRestaurante);

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comentario'
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos inválidos en la solicitud
 */
router.post('/', comentarioController.createComentarios);

module.exports = router;