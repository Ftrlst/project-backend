// const mysql = require('mysql2/promise');

// let notes = []
// let id = 1

// const addNoteHandler = async (request, h) => {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'fitriSQL',
//         database: 'dbms_note',
//     });
//     const title = request.payload.title
//     const content = request.payload.content
//     const penulis = request.payload.penulis

//     try {
//         const sql =
//             'INSERT INTO `note`(`title`, `content`, `penulis`) VALUES (?,?,?)'
//         const values = [title, content, penulis];

//        await connection.execute(sql, values);

//         const response = h.response('Catatan berhasil dibuat').code(200)
//         return response

//     } catch (err) {
//         console.log(err);
//     }
// }

// const showNoteHandler = async (request, h) => {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'fitriSQL',
//         database: 'dbms_note',
//     });
//     try {
//         const [results] = await connection.query(
//             'SELECT * FROM `note`'
//         );

//         return h.response(results)
//     } catch (err) {
//         console.log(err);
//     }

// }

// const showOneNoteHandler = async (request, h) => {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'fitriSQL',
//         database: 'dbms_note',
//     });
//     const id = request.params.id

//     try {
//         const sql = 'SELECT * FROM `note` WHERE `id` = ?';
//         const values = [id]

//         const [result] = await connection.execute(sql, values);

//         return h.response(result)
//     } catch (err) {
//         console.log(err);
//     }


// }

// const updateNoteHandler = async (request, h) => {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'fitriSQL',
//         database: 'dbms_note',
//     });
//     const title = request.payload.title
//     const content = request.payload.content
//     // const penulis = request.payload.penulis
//     const id = request.params.id

//     try {
//         const sql = 'UPDATE `note` SET `title` = ?, `content` = ? WHERE `id` = ?';
//         const values = [title, content, id]

//         await connection.execute(sql, values);

//         const response = h.response('Catatan berhasil diubah').code(200)
//         return response

//     } catch (err) {
//         console.log(err);
//     }


// }

// const deleteNoteHandler = async (request, h) => {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'fitriSQL',
//         database: 'dbms_note',
//     });
//     const id = request.params.id

//     try {
//         const sql = 'DELETE FROM `note` WHERE `id` = ?';
//         const values = [id]

//         await connection.execute(sql, values);

//         const response = h.response('Catatan berhasil dihapus').code(200)
//         return response

//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports = { addNoteHandler, showNoteHandler, updateNoteHandler, deleteNoteHandler, showOneNoteHandler }


const mysql = require('mysql2/promise')


class NoteHandler {
    constructor(service){
        this._service = service

        this.addNoteHandler = this.addNoteHandler.bind(this)
        this.getNoteHandler = this.getNoteHandler.bind(this)
        this.updateNoteHandler = this.updateNoteHandler.bind(this)
        this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
    }

    addNoteHandler = async (request, h) => {
        const{ title, content, penulis} = request.payload

        const noteId = this._service.addNote({title, content, penulis})

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dibuat',
            data: {
                noteId
            }
        })

        response.code(201)
        return response
    }

    getNoteHandler = async (request, h) => {
        const notes = this._service.getNotes()

        const response = h.response({
            status: 'success',
            data: {
                notes
            }
        })

        response.code(201)
        return response
    }

    updateNoteHandler = async (request, h) => {
        try {
            const {id} = request.params
            const {title, content, penulis} = request.payload

            this._service.editNoteById(id, {title, content, penulis})

            return h.response({
                status: 'success',
                message: 'Note berhasil diubah',
            })
        } catch(err){
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteNoteHandler = async (request, h) => {
        try{
            const {id} = request.params
            this._service.deleteNoteById(id)

            return h.response({
                status: 'success',
                message: 'Note berhasil dihapus'
            })
        } catch(err){
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }
}

module.exports = NoteHandler