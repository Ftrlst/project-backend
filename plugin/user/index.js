const { server } = require("@hapi/hapi");
const routes = require("./routes");

const userPlugin = {
    name : 'user',
    version : '1.0.0',
    register : async (server, options) => {
        server.route(routes)
    }
}
module.exports = userPlugin