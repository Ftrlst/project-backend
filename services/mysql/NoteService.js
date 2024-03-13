class NotesService {
    constructor(pool){
        this._pool = pool
    }

    async addNote({title, content, penulis}){
        const result = await this._pool.execute('INSERT INTO note (title, content, penulis) VALUES (:title, :content, :penulis)', {title, content, penulis})
        return result.inisertedId
    }

    async getNotes(){
        const result = await this._pool.query('SELECT *FROM note')
        return result.rows
    }

    async getNoteById(id){
        const result = await this._pool.execute('SELECT * FROM note WHERE id=:id', {id})
        return result.rows
    }

    async editNoteById(id, { title, content, penulis }) {
        const result = await this._pool.execute('UPDATE note SET title=:title, content=:content, penulis=:penulis WHERE id=:id', { title, content, penulis, id })
        return result.affectedRows
      }
    
      async deleteNoteById(id) {
        const result = await this._pool.execute('DELETE FROM note WHERE id=:id', { id })
        return result.affectedRows
      }
}

module.exports = NotesService
