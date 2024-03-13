const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'antrian_app',
    debug: false
})

module.exports = pool