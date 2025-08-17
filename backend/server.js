const express = require('express');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const axios = require('axios');
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const path = require('path');

// Conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '018009998080',
  database: 'vu'
});

const GOOGLE_MAPS_API_KEY = 'AIzaSyAXt2ksAlCGr8mGvVt-fi3GAG3cs0McqEM';

// Configurar almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre único con extensión
  }
});

const upload = multer({ storage });


//Login para usuario
app.post('/api/login/user', (req, res) => {
  const { correo, contrasena } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ? AND tipo = "user";',
    [correo, contrasena],
    (err, results) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      res.json({ message: 'Inicio de sesión exitoso', usuario: results[0] });
      db.query(
        'UPDATE usuarios SET activo = "activo" WHERE id = ?',
        [results[0].id],
        (err) => {
          if (err) {
            console.error('Error al actualizar estado de usuario:', err);
          }
        }
      );
    }
  );
});

//Login para admin
app.post('/api/login/admin', (req, res) => {
  const { correo, contrasena } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ? AND tipo = "admin";',
    [correo, contrasena],
    (err, results) => {
      if (err) {
        console.error('Error al iniciar sesión:', err);
        return res.status(500).json({ error: 'Error al iniciar sesión' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      res.json({ message: 'Inicio de sesión exitoso', usuario: results[0] });
      db.query(
        'UPDATE usuarios SET activo = "activo" WHERE id = ?',
        [results[0].id],
        (err) => {
          if (err) {
            console.error('Error al actualizar estado de usuario:', err);
          }
        }
      );
    }
  );
});


//Registro de usuario
app.post('/api/registro/', (req, res) => {
  const { correo, contrasena } = req.body;
  db.query(
    'INSERT INTO usuarios (correo, contrasena, tipo, activo) VALUES (?, ?, "user", "inactivo")',
    [correo, contrasena],
    (err, results) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
  );
});

//Alta de usuario desde el admin
app.post('/api/altaUsuario/', (req, res) => {
  const { nombre, apellido, correo, contrasena, tipo, activo } = req.body;
  db.query(
    'INSERT INTO usuarios (nombre, apellido, correo, contrasena, tipo, activo) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, correo, contrasena, tipo, activo],
    (err, results) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
  );
});

// Editar perfil de usuario y admin
app.put('/api/editarUsuario/:userId', (req, res) => {
  const { userId } = req.params;
  const { nombre, apellido, correo, contrasena, foto_url } = req.body;

  db.query(
    'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, foto_url = ? WHERE id = ?',
    [nombre, apellido, correo, contrasena, foto_url, userId],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar usuario:', err);
        return res.status(500).json({ error: 'Error al actualizar usuario' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario actualizado exitosamente' });
    }
  );
});

// Obtener perfil de usuario y admin
app.get('/api/usuario/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'SELECT * FROM usuarios WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al obtener usuario:', err);
        return res.status(500).json({ error: 'Error al obtener usuario' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(results[0]);
    }
  );
});

//Eliminar usuario para panel de administrador
app.delete('/api/usuario/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'DELETE FROM usuarios WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado exitosamente' });
    }
  );
});

// Obtener todos los usuarios para el panel de administrador
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

// Cerrar sesión
app.post('/api/logout', (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'ID de usuario requerido' });
  }
  db.query(
    'UPDATE usuarios SET activo = "inactivo" WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
        return res.status(500).json({ error: 'Error al cerrar sesión' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      console.log(`Usuario con ID ${userId} ha cerrado sesión`);
    }
  );
  res.json({ message: 'Sesión cerrada exitosamente' });
}
);

// Obtener todos los lugares para el archivo MenuRutas.js
app.get('/api/lugares', (req, res) => {
  db.query('SELECT * FROM lugares', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener un lugar específico por ID para el archivo Mapa.js
app.get('/api/lugares/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM lugares WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Lugar no encontrado' });
    res.json(results[0]);
  });
});

// Obtener ruta entre dos lugares para el archivo Mapa.js
app.get('/api/caminos/:origenId/:destinoId', (req, res) => {
  const { origenId, destinoId } = req.params;
  db.query(
    'SELECT ruta FROM caminos WHERE origen_id = ? AND destino_id = ?',
    [origenId, destinoId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      // Obtener el campo "ruta" de la base de datos
      const ruta = results[0].ruta;
      // Si es string JSON, intenta parsear
      if (typeof ruta === 'string') {
        try {
          const parsed = JSON.parse(ruta);
          res.json(parsed);
        } catch (e) {
          console.error('Error al parsear JSON:', e);
          res.status(500).json({ error: 'Formato de ruta inválido en la base de datos' });
        }
      } else {
        // Si ya es objeto/array
        res.json(ruta);
      }
    }
  );
});



//Obtener ruta dinámica entre dos puntos usando Google Maps API
router.get('/ruta-dinamica', async (req, res) => {
  const { origen_lat, origen_lng, destino_lat, destino_lng } = req.query;

  if (!origen_lat || !origen_lng || !destino_lat || !destino_lng) {
    return res.status(400).json({ error: 'Faltan coordenadas' });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin: `${origen_lat},${origen_lng}`,
          destination: `${destino_lat},${destino_lng}`,
          mode: 'walking', // Puedes cambiar a 'driving', 'bicycling', etc.
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );

    const steps = response.data.routes[0]?.legs[0]?.steps;

    if (!steps) {
      return res.status(404).json({ error: 'No se pudo obtener la ruta' });
    }

    // Extraer los puntos como { latitude, longitude }
    const ruta = steps.flatMap(step => {
      const start = {
        latitude: step.start_location.lat,
        longitude: step.start_location.lng,
      };
      const end = {
        latitude: step.end_location.lat,
        longitude: step.end_location.lng,
      };
      return [start, end];
    });

    res.json(ruta);
  } catch (error) {
    console.error('Error al obtener la ruta dinámica:', error.message);
    res.status(500).json({ error: 'Error al contactar Google Maps' });
  }
});

module.exports = router;


// CRUD caminos para ADMINISTRADOR
// Obtener todas las rutas entre lugares
app.get('/api/caminos_rute', (req, res) => {
  db.query('SELECT origen.nombre AS origen_nombre, destino.nombre AS destino_nombre, caminos.* FROM caminos INNER JOIN lugares AS origen ON caminos.origen_id = origen.id INNER JOIN lugares AS destino ON caminos.destino_id = destino.id;', (err, results) => {
    if (err) {
      console.error('Error al obtener rutas:', err);

      return res.status(500).json({ error: 'Error al obtener rutas' });
    }
    res.json(results);
  });
});
// Agregar ruta entre dos lugares
app.post('/api/caminos', (req, res) => {
  const { origenId, destinoId, ruta } = req.body;
  db.query(
    'INSERT INTO caminos (origen_id, destino_id, ruta) VALUES (?, ?, ?)',
    [origenId, destinoId, JSON.stringify(ruta)],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Ruta agregada exitosamente', id: results.insertId });
    }
  );
});

// Editar ruta entre dos lugares
app.put('/api/caminos/:origenId/:destinoId', (req, res) => {
  const { origenId, destinoId } = req.params;
  const { ruta } = req.body;
  db.query(
    'UPDATE caminos SET ruta = ? WHERE origen_id = ? AND destino_id = ?',
    [JSON.stringify(ruta), origenId, destinoId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      res.json({ message: 'Ruta actualizada exitosamente' });
    }
  );
});

// Eliminar ruta entre dos lugares
app.delete('/api/caminos/:origenId/:destinoId', (req, res) => {
  const { origenId, destinoId } = req.params;
  db.query(
    'DELETE FROM caminos WHERE origen_id = ? AND destino_id = ?',
    [origenId, destinoId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Ruta no encontrada' });
      }
      res.json({ message: 'Ruta eliminada exitosamente' });
    }
  );
});

// CRUD lugares para ADMINISTRADOR
app.post('/api/lugares', upload.single('imagen'), (req, res) => {
  const { nombre, latitud, longitud } = req.body;
  const imagen = req.file;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  if (latitud === undefined || longitud === undefined) {
    return res.status(400).json({ error: 'Latitud y longitud son obligatorias' });
  }

  const image_URL = imagen ? `http://localhost:3001/uploads/${imagen.filename}` : null;

  db.query(
    'INSERT INTO lugares (nombre, latitud, longitud, image_URL) VALUES (?, ?, ?, ?)',
    [nombre.trim(), parseFloat(latitud), parseFloat(longitud), image_URL],
    (err, results) => {
      if (err) {
        console.error('Error al agregar lugar:', err);
        return res.status(500).json({ error: 'Error al agregar lugar' });
      }
      res.status(201).json({ message: 'Lugar agregado exitosamente', id: results.insertId });
    }
  );
});
// Editar un lugar
app.put('/api/lugares/:id', upload.single('imagen'), (req, res) => {
  const { nombre, latitud, longitud } = req.body;
  const { id } = req.params;
  const imagen = req.file;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  const image_URL = imagen ? `http://localhost:3001/uploads/${imagen.filename}` : req.body.image_URL;
  db.query(
    'UPDATE lugares SET nombre = ?, latitud = ?, longitud = ?, image_URL = ? WHERE id = ?',
    [nombre.trim(), parseFloat(latitud), parseFloat(longitud), image_URL, parseInt(id)],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar lugar:', err);
        return res.status(500).json({ error: 'Error al actualizar lugar' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }
      res.json({ message: 'Lugar actualizado exitosamente' });
    }
  );
});


// Eliminar un lugar 
app.delete('/api/lugares/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.query(
    'DELETE FROM lugares WHERE id = ?',
    [parseInt(id)],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar lugar:', err);
        return res.status(500).json({ error: 'Error al eliminar lugar' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
      }
      res.json({ message: 'Lugar eliminado exitosamente' });
    }
  );
});


app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
