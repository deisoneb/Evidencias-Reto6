const express = require( "express")
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./database')

// Initializations app
const app = express();
app.use(express.json())

//database connection
let db
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000')
    })
    db =getDb()
  }
})

//routes
app.get('/restaurantes', (req, res) => {
  let restaurantes = [];

  db.collection('restaurantes')
    .find()
    .sort({ nombre: 1 })
    .forEach(restaurante => restaurantes.push(restaurante))
    .then(() => {
      res.status(200).json(restaurantes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

// Route to get a restaurant by its ID
app.get('/restaurantes/:id', (req, res) => {
   // Check if the provided ID is a valid ObjectId
  if (ObjectId.isValid(req.params.id)) {
    db.collection('restaurantes')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc); // Respond with the document if found
      })
      .catch(err => {
        res.status(500).json({ error: 'Could not fetch the document' }); // Handle database errors
      });
  } else {
    res.status(500).json({ error: 'Invalid ID format' }); // Handle invalid ObjectId
  }
});


app.post('/restaurantes', (req, res) => {
  const restaurantes = req.body;

  console.log('Datos recibidos:', JSON.stringify(restaurantes, null, 2));

  // Verificar si restaurantes es un array
  if (!Array.isArray(restaurantes)) {
    console.error('El cuerpo de la solicitud no es un array');
    return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un array de restaurantes' });
  }

  // Verificar si el array está vacío
  if (restaurantes.length === 0) {
    console.error('El array de restaurantes está vacío');
    return res.status(400).json({ error: 'El array de restaurantes no puede estar vacío' });
  }

  // Validar cada restaurante
  const restaurantesValidos = restaurantes.filter(restaurante => {
    const esValido = restaurante.nombre && restaurante.contacto && restaurante.categorias;
    if (!esValido) {
      console.error('Restaurante inválido:', restaurante);
    }
    return esValido;
  });

  if (restaurantesValidos.length === 0) {
    console.error('No hay restaurantes válidos para insertar');
    return res.status(400).json({ error: 'No hay restaurantes válidos para insertar' });
  }

  // Añadir la fecha de creación a cada restaurante
  const restaurantesConFecha = restaurantesValidos.map(restaurante => ({
    ...restaurante,
    fechaCreacion: new Date()
  }));

  console.log('Intentando insertar', restaurantesConFecha.length, 'restaurantes');

  db.collection('restaurantes')
    .insertMany(restaurantesConFecha)
    .then(result => {
      console.log('Inserción exitosa:', result.insertedCount, 'restaurantes insertados');
      res.status(201).json({
        message: `${result.insertedCount} restaurantes insertados exitosamente`,
        insertedIds: result.insertedIds
      });
    })
    .catch(err => {
      console.error('Error al insertar documentos:', err);
      res.status(500).json({ error: 'No se pudieron crear los nuevos documentos', details: err.message });
    });
});


//Get a user
app.get('/usuarios', (req, res) => {
  let usuarios = [];

  db.collection('usuarios')
    .find()
    .sort({ nombre: 1 })
    .forEach(usuario => usuarios.push(usuario))
    .then(() => {
      res.status(200).json(usuarios);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

//Get a user by its ID
app.post('/usuarios', (req, res) => {
  const usuarios = req.body;

  console.log('Datos recibidos:', JSON.stringify(usuarios, null, 2));

  // Verificar si usuarios es un array
  if (!Array.isArray(usuarios)) {
    console.error('El cuerpo de la solicitud no es un array');
    return res.status(400).json({ error: 'El cuerpo de la solicitud debe ser un array de usuarios' });
  }

  // Verificar si el array está vacío
  if (usuarios.length === 0) {
    console.error('El array de usuarios está vacío');
    return res.status(400).json({ error: 'El array de usuarios no puede estar vacío' });
  }

  // Validar cada usuario
  const usuariosValidos = usuarios.filter(usuario => {
    const esValido = usuario.nombre && usuario.email && usuario.contraseña;
    if (!esValido) {
      console.error('Usuario inválido:', usuario);
    }
    return esValido;
  });

  if (usuariosValidos.length === 0) {
    console.error('No hay usuarios válidos para insertar');
    return res.status(400).json({ error: 'No hay usuarios válidos para insertar' });
  }

  // Añadir la fecha de registro y rol predeterminado a cada usuario
  const usuariosConFecha = usuariosValidos.map(usuario => ({
    ...usuario,
    fechaRegistro: new Date(),
    rol: usuario.rol || 'usuario' // Si no se proporciona rol, se asigna 'usuario' por defecto
  }));

  console.log('Intentando insertar', usuariosConFecha.length, 'usuarios');

  db.collection('usuarios')
    .insertMany(usuariosConFecha)
    .then(result => {
      console.log('Inserción exitosa:', result.insertedCount, 'usuarios insertados');
      res.status(201).json({
        message: `${result.insertedCount} usuarios insertados exitosamente`,
        insertedIds: result.insertedIds
      });
    })
    .catch(err => {
      console.error('Error al insertar documentos:', err);
      res.status(500).json({ error: 'No se pudieron crear los nuevos documentos', details: err.message });
    });
});

