const { nanoid } = require('nanoid')

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid()
    this._notes.push({
      id,
      title,
      body, 
      tags
    })

    return id
  }

  getNotes() {
    return this._notes
  }

  getNoteById(id) {
    return this._notes.filter(n => n.id == id)
  }

  editNoteById(id, { title, body, tags }) {
    this._notes = this._notes.map(n => {
      if (n.id == id) {
        return { id, title, body, tags}
      } 
        return n
    })
  }

  deleteNoteById(id) {
    this._notes = this._notes.filter(n => n.id != id)
  }
}

module.exports = NotesService;