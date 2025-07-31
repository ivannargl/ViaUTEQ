const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '018009998080',
  database: 'vu'
});

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


app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
