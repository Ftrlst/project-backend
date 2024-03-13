const mysql = require ('mysql2/promise');

const addUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'virgi2007btg',
        database: 'notes',
    });
    const nama = request.payload.nama
    const email = request.payload.email
    const password = request.payload.password

    try {
        const sql = 'INSERT INTO `notes`.`user` (`nama`, `email`, `password`) VALUES(?, ?, ?)'
        const values = [nama, email, password]

        const [results, field] = await connection.execute(sql, values);
        const response = h.response("berhasil").code(200);
        return response;
    } catch (err) {
        console.log(err);
    }

}

const getUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'virgi2007btg',
        database: 'notes',
    });
    try {
        const [results] = await connection.query(
          'SELECT * FROM `user`'
        );
        const response = h.response(results).code(200);
        return response;
    } catch (err) {
        console.log(err);
    }
    
}

const updateUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'virgi2007btg',
        database: 'notes',
    });
    const nama = request.payload.nama
    const email = request.payload.email
    const password = request.payload.password
    const id = request.payload.id

    try {
        const sql = 'UPDATE `user` SET `nama` = ?, `email` = ?, `password` = ? WHERE `id` = ?'
        const values = [nama, email, password, id]
 
        const [results, field] = await connection.execute(sql, values);
        const response = h.response("berhasil").code(200);
        return response;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: 'virgi2007btg',
        database: 'notes',
    });
    
    const id = request.params.id

    try {
        const sql = 'DELETE FROM `user` WHERE id=?'
        const values = [id]

        const [results, field] = await connection.execute(sql, values);
        const response = h.response("berhasil").code(200);
        return response;
    } catch (err) {
        console.log(err);
    }
}

module.exports = { addUser, getUser, updateUser, deleteUser}