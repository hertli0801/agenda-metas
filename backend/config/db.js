const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'db_agenda_metas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar conexión de inmediato
db.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la base de datos MySQL.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar a la base de datos:', err.message);
    });

module.exports = db;