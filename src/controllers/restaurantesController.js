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


// Obtener restaurantes por ubicación de usuario en un radio de 5 KM
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

        // Buscar restaurantes cercanos utilizando $geoNear con aggregate()
        const restaurantes = await Restaurante.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [long, lat] },
                    distanceField: "distancia",
                    maxDistance: 5000, // Radio de 5km
                    spherical: true
                }
            }
        ]);

        if (restaurantes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron restaurantes cercanos en un radio de 5km.' });
        }

        console.log(`Encontrados ${restaurantes.length} restaurantes cercanos.`);
        res.json(restaurantes);
    } catch (error) {
        console.error("Error al buscar restaurantes cercanos:", error);
        res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
    }
};

// Obtener restaurantes por tipo de comida
exports.getMenu = async (req, res) => {
    try {
        const { tipo } = req.params;
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

        // Convertir el tipo de comida a minúsculas para la comparación
        const tipoLowerCase = tipo.toLowerCase();

        // Buscar restaurantes por tipo de comida, ordenados por cercanía
        const restaurantes = await Restaurante.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [long, lat] },
                    distanceField: "distancia",
                    maxDistance: 5000, // Radio de 5km
                    spherical: true,
                    query: { 
                        categorias: {
                             $regex: new RegExp(tipoLowerCase, 'i') 
                        }
                    }
                }
            }
        ]);

        if (restaurantes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron restaurantes para la categoría especificada en un radio de 5km.' });
        }

        res.json(restaurantes);
    } catch (error) {
        console.error("Error al buscar restaurantes por tipo de comida:", error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};
