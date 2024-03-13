const UserAuthHandler = require('./handler')
const routes = require('./routes')

module.exports = {
    name: 'user-auth',
    version: '1.0.0',
    register: (server, {service}) => {
        const {userService} = service 
        server.route(routes(new UserAuthHandler(userService)))
    }
}