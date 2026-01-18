const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Esto asegura que la base se cree en la carpeta donde estás parado
const dbPath = path.resolve(__dirname, 'vader.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("Error al crear la base:", err.message);
    else console.log("Archivo vader.db creado/conectado con éxito.");
});

db.serialize(() => {
    // Creamos la tabla de consultas
    db.run(`CREATE TABLE IF NOT EXISTS consultas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        correo TEXT,
        mensaje TEXT,
        fecha_hora TEXT
    )`, (err) => {
        if (err) console.log("Error en tabla consultas:", err.message);
        else console.log("Tabla 'consultas' lista.");
    });

    // Creamos la tabla de presupuestos
    db.run(`CREATE TABLE IF NOT EXISTS presupuestos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        consulta_id INTEGER,
        descripcion_trabajo TEXT,
        total_materiales REAL,
        mano_de_obra REAL,
        total_final REAL,
        fecha_emision TEXT,
        FOREIGN KEY (consulta_id) REFERENCES consultas(id)
    )`, (err) => {
        if (err) console.log("Error en tabla presupuestos:", err.message);
        else console.log("Tabla 'presupuestos' lista.");
    });
});

module.exports = db;