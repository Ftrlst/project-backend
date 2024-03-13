const mysql = require('mysql2/promise');


class NoteHandler {
    constructor(service) {
        this._service = service

        // ini ditambahkan agar masing-masing method dapat mengakses 'this'
        this.addNoteHandler = this.addNoteHandler.bind(this)
        this.getNotesHandler = this.getNotesHandler.bind(this)
        this.updateNoteHandler = this.updateNoteHandler.bind(this)
        this.deleteNoteHandler = this.deleteNoteHandler.bind(this)
    }

    // PERHATIKAN METHOD INI (LAMA) DIBANDINGKAN METHOD YANG BARU
    // addNoteHandler = async (request, h) => {
    //     const connection = await mysql.createConnection({
    //         host: 'localhost',
    //         user: 'root',
    //         password: 'virgi2007btg',
    //         database: 'notes',
    //     });
    //     const title = request.payload.title
    //     const content = request.payload.content
    //     const writer = request.payload.writer

    //     try {
    //         const sql = 'INSERT INTO `notes`.`note` (`title`, `content`, `writer`) VALUES(?, ?, ?)'
    //         const values = [title, content, writer]

    //         const [results, field] = await connection.execute(sql, values);
    //         const response = h.response("berhasil").code(200);
    //         return response;
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }

    addNoteHandler = async (request, h) => {
        const { title, content, writer } = request.payload

        const noteId = this._service.addNote({ title, content, writer })


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

    getNotesHandler = async (request, h) => {

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

            const { id } = request.params
            const { title, content, writer } = request.payload

            this._service.editNoteById(id, { title, content, writer })

            return h.response({
                status: 'success',
                message: 'Note berhasil diubah',
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

    deleteNoteHandler = async (request, h) => {

        
        try {
            const { id } = request.params
            this._service.deleteNoteById(id)

            return h.response({
                status: 'success',
                message: 'note berhasil dihapus'
            })
        } catch (err) {
            return h.response({
                status: 'fail',
                message: err.message,
            })
        }
    }

}



module.exports = NoteHandler
