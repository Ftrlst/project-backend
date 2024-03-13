const mysql = require ('mysql2/promise');

const addUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fitriSQL',
        database: 'dbms_note',
    });
    const nama = request.payload.nama
    const email = request.payload.email
    const password = request.payload.password

    try {
        const sql =
            'INSERT INTO `user`(`nama`, `email`, `password`) VALUES (?,?,?)'
        const values = [nama, email, password];

        const [result, fields] = await connection.execute(sql, values);

        const response = h.response('User berhasil dibuat').code(200)
        return response

    } catch (err) {
        console.log(err);
    }
}

const showUser = async (request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fitriSQL',
        database: 'dbms_note',
    });
    try {
        const [results] = await connection.query(
            'SELECT * FROM `user`'
        );

        return h.response(results)
    } catch (err) {
        console.log(err);
    }

}

const updateUser = async(request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fitriSQL',
        database: 'dbms_note',
    });
    const nama = request.payload.nama
    const email = request.payload.email
    const password = request.payload.password
    const id = request.params.id

    try {
        const sql = 'UPDATE `user` SET `nama` = ?, `email` = ?, `password` = ? WHERE `id` = ?';
        const values = [nama, email, password, id]
      
        const [result, fields] = await connection.execute(sql, values);

        const response = h.response('User berhasil diubah').code(200)
        return response
      
      }catch (err) {
        console.log(err);
    }
      
      
}

const deleteUser = async(request, h) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'fitriSQL',
        database: 'dbms_note',
    });
    const id = request.params.id

    try {
        const sql = 'DELETE FROM `user` WHERE `id` = ?';
        const values = [id]
      
        const [result, fields] = await connection.execute(sql, values);

        const response = h.response('User berhasil dihapus').code(200)
        return response
    
      } catch (err) {
        console.log(err);
      }
}


module.exports = {addUser, showUser, updateUser, deleteUser}