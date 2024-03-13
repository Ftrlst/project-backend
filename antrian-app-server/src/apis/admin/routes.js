const routes = handlers => ([
    {
        method: 'POST',
        path: '/admin',
        handler: handlers.postAdmin
    },
    {
        method: 'GET',
        path: '/admin/{id}',
        handler: handlers.getAdmin
    },
])

module.exports = routes