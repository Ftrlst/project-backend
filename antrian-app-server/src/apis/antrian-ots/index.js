const AntrianOtsHandler = require('./handlers')
const routes = require('./routes')

module.exports = {
    name: 'antrian-ots',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const antrianOtsHandler = new AntrianOtsHandler(service, validator)
        server.route(routes(antrianOtsHandler))
    }
}