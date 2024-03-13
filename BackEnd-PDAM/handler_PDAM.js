let pelangganPDAM = [
    // { nama: "Sunaryo", nomorPelanggan: 1, meterTerakhir: 45, nomorRumah: 10, nomorTelepon: "0895414014570" },
    // { nama: "Budi", nomorPelanggan: 2, meterTerakhir: 77, nomorRumah: 13, nomorTelepon: "081953788421" },
    // { nama: "Pego", nomorPelanggan: 3, meterTerakhir: 70, nomorRumah: 12, nomorTelepon: "089540909909" },
    // { nama: "Bobo", nomorPelanggan: 4, meterTerakhir: 79, nomorRumah: 19, nomorTelepon: "088909869878" },
    // { nama: "Koko", nomorPelanggan: 5, meterTerakhir: 57, nomorRumah: 23, nomorTelepon: "087654358904" },
    // { nama: "Bagas", nomorPelanggan: 6, meterTerakhir: 65, nomorRumah: 20, nomorTelepon: "08985434567" },
    // { nama: "Windah", nomorPelanggan: 7, meterTerakhir: 30, nomorRumah: 22, nomorTelepon: "0895098543" },
    // { nama: "Cahyo", nomorPelanggan: 8, meterTerakhir: 90, nomorRumah: 43, nomorTelepon: "08467276247" },
    // { nama: "Pornomo", nomorPelanggan: 9, meterTerakhir: 50, nomorRumah: 24, nomorTelepon: "0885297249" },
    // { nama: "Rasya", nomorPelanggan: 10, meterTerakhir: 55, nomorRumah: 25, nomorTelepon: "08928900285" },
]
let id = 1

const tampilkanPelanggan = (request, h) => {
    const response = h.response(pelangganPDAM).code(200)
    return response
}

const addPelanggan = (request, h) => {

    pelangganPDAM.push({
        nama: request.payload.nama,
        nopelanggan: id++,
        meterterakhir: request.payload.meterterakhir,
        norumah: request.payload.norumah,
        notelepon: request.payload.notelepon
    })

    const response = h.response('Pelanggan berhasil ditambahkan').code(200)
    return response
}

const noTerakhir = (request, h) => {
    const lastno = h.response(pelangganPDAM[pelangganPDAM.length - 1]).code(201)
    return lastno
}

const cariPelanggan =(request, h) => {
    const {id} = request.params;
    pelangganPDAM = pelangganPDAM.map(pelanggan => {
        if (pelangganPDAM.nopelanggan == id) {
            // console.log("Pelanggan yang dicari", this.pelanggan[i])
            // pelangganPDAM.nama
            // pelangganPDAM.nopelanggan
            // pelangganPDAM.meterterakhir
            // pelangganPDAM.norumah
            // pelangganPDAM.notelepon

            return pelanggan;
          }
          return pelanggan
    })
    return h.response(pelangganPDAM).code(202)
}

const noTelBaru = (request, h) => {
    const{id} = request.params;
    const{notelbaru} = request.payload;
    pelangganPDAM = pelangganPDAM.map(pelanggan => {
        if(pelanggan.nopelanggan == id) {
            pelanggan.notelepon = notelbaru
            return pelanggan
        }
        return pelanggan
    })
    return h.response(pelangganPDAM).code(202)
}

const meterBaru = (request, h) => {
    const{id} = request.params;
    const{meterbaru} = request.payload;
    pelangganPDAM = pelangganPDAM.map(pelanggan => {
        if(pelanggan.nopelanggan == id) {
            pelanggan.meterterakhir = meterbaru
            return pelanggan
        }
        return pelanggan
    })
    return h.response(pelangganPDAM).code(202)
}

const pembayaranPerbulan = (request, h) => {
    const {noPelanggan, meterbaru} = request.payload;
    const pelanggan = pelangganPDAM.find(pdam => pdam.nopelanggan === noPelanggan);
    if(!pelanggan){
        return h.response({error: 'Pelanggan tidak ditemukan'}).code(404);
    } 
    const konsumsiairperbulan = meterbaru - pelanggan.meterterakhir;
    const tarifperliter = 1000;
    const total = (konsumsiairperbulan * tarifperliter)
    return h.response({total}).code(200);
}

module.exports = { tampilkanPelanggan, addPelanggan, noTerakhir, cariPelanggan,noTelBaru, meterBaru, pembayaranPerbulan }