class NotesService {
  constructor(pool) {
    this._pool = pool
  }

  async addNote({ title, content, writer }) {
    const result = await this._pool.execute('INSERT INTO notes (title, content, writer) VALUES (:title, :content, :writer)', { title, content, writer })
    return result.inisertedId
  }

  async getNotes() {
    const result = await this._pool.query('SELECT * FROM notes')
    return result.rows
  }

  async getNoteById(id) {
    const result = await this._pool.execute('SELECT * FROM notes WHERE id=:id', { id })
    return result.rows
  }

  async editNoteById(id, { title, content, writer }) {
    const result = await this._pool.execute('UPDATE notes SET title=:title, content=:content, writer=:writer WHERE id=:id', { title, content, writer, id })
    return result.affectedRows
  }

  async deleteNoteById(id) {
    const result = await this._pool.execute('DELETE FROM notes WHERE id=:id', { id })
    return result.affectedRows
  }
}

module.exports = NotesService;