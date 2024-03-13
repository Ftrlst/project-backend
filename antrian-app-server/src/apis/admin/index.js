const AdminHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'admin-api',
    version: '1.0.0',
    register: async (server, {adminService}) => {
        const adminHandler = new AdminHandler(adminService)
        server.route(routes(adminHandler))
    }
}