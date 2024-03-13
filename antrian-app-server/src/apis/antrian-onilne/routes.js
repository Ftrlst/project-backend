const routes = (handler) => [
    {
        // register antrian
        method: 'post',
        path: '/online',
        handler: handler.postAntrian
    },
    {
        // cek booking
        method: 'get',
        path: '/online/{noPeserta}',
        handler: handler.getAntrian
    },
    {
        // cancel antrian
        method: `delete`,
        path: '/online',
        handler: handler.deleteAntrian
    },
    {
        // get list antrian
        method: 'get',
        path: '/get-online/{hari}',
        handler: handler.getListAntrian
    }
]

module.exports = routes