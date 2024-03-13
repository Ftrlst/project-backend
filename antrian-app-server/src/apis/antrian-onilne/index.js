const AntrianOnlineHandler = require('./handlers')
const routes = require('./routes')

module.exports = {
    name: 'antrian-online',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const antrianOnlineHandler = new AntrianOnlineHandler(service, validator)
        server.route(routes(antrianOnlineHandler))
        
    }
}