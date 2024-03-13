const { tampilkanPelanggan, addPelanggan, noTerakhir, cariPelanggan, noTelBaru, meterBaru, pembayaranPerbulan } = require("./handler_PDAM");

const routes = [
    {
        method : 'GET',
        path : '/tampilkanPelanggan',
        handler : tampilkanPelanggan
    },
    {
        method : 'POST',
        path : '/addpelanggan',
        handler : addPelanggan
    },
    {
        method : "GET",
        path : "/noterakhir",
        handler : noTerakhir
    },
    {
        method : "GET",
        path : "/caripelanggan/{id}",
        handler : cariPelanggan
    },
    {
        method : "PUT",
        path : "/nobaru/{id}",
        handler : noTelBaru
    },
    {
        method : "PUT",
        path : "/meterterbaru/{id}",
        handler : meterBaru
    },
    {
        method : "POST",
        path : "/pembayaranbulanan",
        handler : pembayaranPerbulan
    }
]

module.exports = routes