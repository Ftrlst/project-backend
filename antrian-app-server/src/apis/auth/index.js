const routes = require('./routes')
const AuthHandler = require('./handler')

module.exports = {
    name: 'auth',
    version: '1.0.0',
    register: async (server, {service, tokenManager}) => {
        const authHandler = new AuthHandler(service, tokenManager)
        server.route(routes(authHandler))
    }
}