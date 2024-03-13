const routes = (handler) => [
    {
        // add active day
        method: 'post',
        path: '/active-day',
        handler: handler.postActiveDay,
        options: {
            auth: 'antrian_jwt'
        }
    },
    {
        // add active day
        method: 'get',
        path: '/active-day',
        handler: handler.getAllActiveDay
    },
    {
        // add active day
        method: `put`,
        path: '/active-day/{id}',
        handler: handler.putActiveDay,
        options: {
            auth: 'antrian_jwt'
        }
    },
    {
        // add active day
        method: 'delete',
        path: '/active-day/{id}',
        handler: handler.deleteActiveDay,
        options: {
            auth: 'antrian_jwt'
        }
    }
]

module.exports = routes