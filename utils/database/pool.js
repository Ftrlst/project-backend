const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'note',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool