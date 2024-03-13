const {addUser, showUser, updateUser, deleteUser} = require("./handler");

const routes = [
    {
        method : 'POST',
        path : '/user',
        handler : addUser
    },
    {
        method : 'GET',
        path : '/showuser',
        handler : showUser
    },
    {
        method: 'PUT',
        path: '/showUser/update/{id}',
        handler: updateUser
    },
    {
        method: 'DELETE',
        path: '/user/showUser/{id}',
        handler: deleteUser
    }
]

module.exports = routes