const routes = handler => [
    {
        method: 'POST',
        path: '/user',
        handler: handler.postUserAuth
    },
    {
        method: 'PUT',
        path: '/user',
        handler: handler.putUserAuth
    },
    {
        method: 'DELETE',
        path: '/user',
        handler: handler.deleteUserAuth
    }
]

module.exports = routes