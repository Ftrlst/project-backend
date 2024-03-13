const { response } = require("@hapi/hapi/lib/validation")
const ClientError = require("../../exceptions/ClientError")

class AntrianOtsHandler {
    constructor ({antrianOtsService, activeDayService}, validator) {
        this._service = antrianOtsService
        this._activeDayService = activeDayService
        this._validator = validator

        this.postAntrian = this.postAntrian.bind(this)
        this.getAntrian = this.getAntrian.bind(this)
        this.getListAntrian = this.getListAntrian.bind(this)
    }
    
    async postAntrian({payload}, h) {

        try {
            this._validator.validatePostAntrianOtsPayload(payload)

            const {hari, no_peserta:noPeserta } = payload
        
            let cekAntrian = await this._service.getAntrian(noPeserta)

            if (cekAntrian.length > 0) {
                const dataAntrian = cekAntrian[0]
                const response = h.response({
                    status: 'fail',
                    message: 'No Peserta telah terdaftar pada antrian',
                    data: {
                        no_peserta: dataAntrian.nomor_peserta,
                        hari: dataAntrian.label,
                        jam: dataAntrian.jam_pelayanan,
                        urutan: dataAntrian.urutan
                    }
                })
                response.code(401)
                return response
            }

            
            // cek kuota antrian
            const hariAktif = await this._activeDayService.getActiveDay(hari)
            const jumlahAntrian = await this._service.countAntrian(hari)

            if (hariAktif.length == 0) {
                const response = h.response({
                    status: 'fail',
                    message: 'Hari aktif tidak ditemukan'
                })
                response.code(400)
                return response
            }
            
            if (hariAktif[0].kuota_ots <= jumlahAntrian) {
                const response = h.response({
                    status: 'fail',
                    message: 'Gagal mendaftarkan antrian. Kuota Antrian On the spot telah penuh.'
                })
                response.code(400)
                return response
            }

            let urutanTerakhir = await this._service.getLastUrutan(hari)
            if (urutanTerakhir == 0) {
                urutanTerakhir = 0
            } else {
                urutanTerakhir = urutanTerakhir[0].urutan
            }

            const antrian = await this._service.addAntrian(payload, urutanTerakhir + 1)

            const response = h.response({
                status: 'success',
                message: 'Berhasil mendaftarkan antrian', 
                data: {
                    payload,
                    antrian
                }
            })

            response.code(200)
            return response
            
        } catch (err) {
            if (err instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: err.message
                })
                response.code(400)

                return response
            }
        }
        
    }

    async getAntrian({params}, h) {
        console.log('getAntrian')
        const { noPeserta } = params

        let antrian = await this._service.getAntrian(noPeserta)

        const response = h.response({
            status: 'success',
            data: {
                antrian: antrian.length == 0 ? null : {
                    no_peserta: antrian[0].nomor_peserta,
                    hari: antrian[0].label,
                    tanggal: antrian[0].tanggal,
                    jam: antrian[0].jam_pelayanan,
                    urutan: antrian[0].urutan
                }
            }
        })

        response.code(200)
        return response

    }

    async deleteAntrian({payload}, h) {
        console.log('deleteAntrian')

        await this._service.deleteAntrian(payload)

        const response = h.response({
            status: 'success',
            message: 'Antrian berhasil dibatalkan'
        })

        response.code(201)
        return response
    }

    async getListAntrian({params}, h) {
        console.log('getListAntrian')
        const antrian = await this._service.getAllAntrian(params.hari)

        const response = h.response({
            status: 'success',
            data: antrian
        })

        response.code(200)
        return response
    }



}

module.exports = AntrianOtsHandler