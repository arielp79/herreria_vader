const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./vader.db');

// Creamos la tabla con el campo de fecha y hora
db.run(`CREATE TABLE IF NOT EXISTS consultas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    correo TEXT,
    mensaje TEXT,
    fecha_hora TEXT
)`);

app.post('/guardar-consulta', (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const fechaActual = new Date().toLocaleString('es-AR');

    const sql = `INSERT INTO consultas (nombre, correo, mensaje, fecha_hora) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [nombre, correo, mensaje, fechaActual], (err) => {
        if (err) return res.status(500).send("Error al guardar");
        res.send("Consulta guardada con éxito. ¡Ya la tienes en tu base de datos!");
    });
});

app.listen(3000, () => {
    console.log("Servidor Vader activo en puerto 3000");
});

app.post('/guardar-presupuesto', (req, res) => {
    const { consulta_id, descripcion, materiales, obra, total } = req.body;
    const fecha = new Date().toLocaleString();

    const sql = `INSERT INTO presupuestos (consulta_id, descripcion_trabajo, total_materiales, mano_de_obra, total_final, fecha_emision) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [consulta_id, descripcion, materiales, obra, total, fecha], function(err) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send("Presupuesto guardado");
    });
});