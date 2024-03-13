const routesUser = require("./routes")

const UserPlugin = {
    name : 'user',
    version : '1.0.0',
    register : async (server, options) => {
        server.route(routesUser)
    }
}

module.exports = UserPlugin