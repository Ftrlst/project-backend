const { addUser, getUser, updateUser, deleteUser } = require("./handler")

const routesUser = [
    {
        method : 'POST',
        path : '/user',
        handler : addUser
    },
    {
        method: 'GET',
        path: '/user',
        handler: getUser
    },
    {
        method: 'PUT',
        path: '/user',
        handler: updateUser
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        handler: deleteUser
    },
    
]

module.exports = routesUser