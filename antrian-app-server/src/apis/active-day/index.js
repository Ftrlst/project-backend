const ActiveDayHandler = require('./handlers')
const routes = require('./routes')

module.exports = {
    name: 'active-day',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const activeDayHandler = new ActiveDayHandler(service, validator)
        server.route(routes(activeDayHandler))
        
    }
}