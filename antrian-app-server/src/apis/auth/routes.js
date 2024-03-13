const routes = handler => [
    {   // for login purpose
        method: 'POST',
        path: '/auth',
        handler: handler.postAuth
    },
    {   // for refresh purpose
        method: 'PUT',
        path: '/auth',
        handler: handler.putAuth
    },
    {   // for logout purpose
        method: 'DELETE',
        path: '/auth',
        handler: handler.deleteAuth
    },
]

module.exports = routes