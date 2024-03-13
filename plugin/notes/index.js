// const { server } = require("@hapi/hapi");
const NoteHandler = require("./handler");
const routes = require("./routes");

const notesPlugin = {
    name : 'notes',
    version : '1.0.0',
    register : async (server, {service}) => {

        const noteHandler = new NoteHandler(service)
        const noteRoutes = routes(noteHandler)
        server.route(noteRoutes)
    }
}
module.exports = notesPlugin