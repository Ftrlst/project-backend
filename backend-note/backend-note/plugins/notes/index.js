const routes = require("./routes")
const NoteHandler = require('./handler')

const notesPlugin = {
    name : 'notes',
    version : '1.0.0',
    register : async (server, { service }) => {

        const noteHandler = new NoteHandler(service)
        const noteRoutes = routes(noteHandler)
        server.route(noteRoutes)
    }
}

module.exports = notesPlugin