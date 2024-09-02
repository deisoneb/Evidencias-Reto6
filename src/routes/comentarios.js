const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosController');

router.post('/', comentariosController.createComentarios);
router.get('/:restauranteId', comentariosController.getComentariosByRestaurante);

module.exports = router;
