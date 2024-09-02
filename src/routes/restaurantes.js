const express = require('express');
const router = express.Router();
const restaurantesController = require('../controllers/restaurantesController.js');

router.post('/', restaurantesController.createRestaurante);
router.put('/:id', restaurantesController.updateRestaurante);
router.delete('/:id', restaurantesController.deleteRestaurante);
router.get('/', restaurantesController.getRestaurante);

/*router.get('/', async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().sort({ nombre: 1 }); // Ordenar alfabéticamente por nombre
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error); // Mostrar el error exacto
        res.status(500).json({ error: "Error al obtener los restaurantes" });
    }
});
*/
module.exports = router;
