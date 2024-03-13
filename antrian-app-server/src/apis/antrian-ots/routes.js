const routes = (handler) => [
    {
        // register antrian
        method: 'post',
        path: '/ots',
        handler: handler.postAntrian
    },
    {
        // cek booking
        method: 'get',
        path: '/ots/{noPeserta}',
        handler: handler.getAntrian
    },
    {
        // get list antrian
        method: 'get',
        path: '/get-ots/{hari}',
        handler: handler.getListAntrian
    }
]

module.exports = routes