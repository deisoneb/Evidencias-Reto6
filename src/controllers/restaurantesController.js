const Restaurante = require('../models/Restaurante.js');

// Crear un nuevo restaurante
exports.createRestaurante = async (req, res) => {
    try {
        const nuevoRestaurante = new Restaurante(req.body);
        await nuevoRestaurante.save();
        res.status(201).json(nuevoRestaurante);
    } catch (error) {
        res.status(500).json({ error: "Error al crear restaurante" });
    }
};

// Actualizar un restaurante
exports.updateRestaurante = async (req, res) => {
    try {
        const restaurante = await Restaurante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(restaurante);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar restaurante" });
    }
};

// Eliminar un restaurante
exports.deleteRestaurante = async (req, res) => {
    try {
        await Restaurante.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar restaurante" });
    }
};

//obtener resturantes
exports.getRestaurante = async (req, res) => {
    try {
        const restaurantes = await Restaurante.find().sort({ nombre: 1 }); // Ordenar alfabéticamente por nombre
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error("Error al obtener los restaurantes:", error); // Mostrar el error exacto
        res.status(500).json({ error: "Error al obtener los restaurantes" });
    }
};

exports.getRestauranteById = async (req, res) => {
    try {
      const restaurante = await Restaurante.findById(req.params.id);
      if (restaurante) {
        res.json(restaurante);
      } else {
        res.status(404).json({ message: 'Restaurante no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


//Obtener restaurantes por ubicacion de usuario en un radio de 5 KM
exports.getLocation = async (req, res) => {
    try {
        const { latitud, longitud } = req.query;
        
        // Validar si se proporcionaron las coordenadas
        if (!latitud || !longitud) {
            return res.status(400).json({ error: 'Latitud y longitud son requeridos.' });
        }
        
        // Convertir las coordenadas a tipo numérico
        const lat = parseFloat(latitud);
        const long = parseFloat(longitud);
        
        // Validar que las coordenadas sean números válidos
        if (isNaN(lat) || isNaN(long)) {
            return res.status(400).json({ error: 'Latitud y longitud deben ser números válidos.' });
        }
        
        // Buscar restaurantes cercanos utilizando $near y $maxDistance (en metros)
        const restaurantes = await Restaurante.find({
            'contacto.ubicacion': {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [long, lat]
                    },
                    $maxDistance: 5000 // Radio de 5km
                }
            }
        }).exec(); // Añadir .exec() para asegurar que la promesa se resuelva correctamente
        
        console.log(`Encontrados ${restaurantes.length} restaurantes cercanos.`);
        res.json(restaurantes);
    } catch (error) {
        console.error("Error al buscar restaurantes cercanos:", error);
        res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
    }
};

// Obtener restaurantes por tipo de comida
exports.getMenu = async (req, res) => {
    const { tipo } = req.params;

  try {
    // Búsqueda usando expresiones regulares para coincidencias parciales
    const restaurantesPorCategoria = await Restaurante.find({
      categorias: { $regex: tipo, $options: 'i' } // 'i' para que sea case-insensitive
    }).sort({ estrellas: -1 }); // Ordenar por estrellas de mayor a menor

    if (restaurantesPorCategoria.length === 0) {
      return res.status(404).json({ message: `No se encontraron restaurantes para la categoría: ${tipo}` });
    }

    res.json(restaurantesPorCategoria);
  } catch (error) {
    console.error("Error al obtener restaurantes por categoría:", error);
    res
      .status(500)
      .json({ error: "Error al obtener restaurantes por categoría." });
  }
};
  