const { response } = require("@hapi/hapi/lib/validation")
const ClientError = require("../../exceptions/ClientError")

class ActiveDayHandler {
    constructor (service, validator) {

        this._service = service
        this._validator = validator

        this.postActiveDay = this.postActiveDay.bind(this)
        this.getAllActiveDay = this.getAllActiveDay.bind(this)
        this.getActiveDay = this.getActiveDay.bind(this)
        this.putActiveDay = this.putActiveDay.bind(this)
        this.deleteActiveDay = this.deleteActiveDay.bind(this)
    }

    async postActiveDay({payload, auth}, h) {
        try {
            this._validator.validatePostActivedDayPayload(payload)

            const insertId = await this._service.addActiveDay(payload)
            const response = h.response({
                status: 'success',
                message: 'Active Day berhasil ditambahkan',
                data: {
                    insertId
                }
            })
            response.code(201)
            return response
            
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                })

                response.code(400)
                return response
            }

            const response = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan pada server'
            })

            response.code(500)
            return response
        }
    }

    async getAllActiveDay(_, h) {
        console.log('Get Active Day')
        const hariAktif = await this._service.getAllActiveDay()
        const response = h.response({
            status: 'success',
            data: {
                activeDays: hariAktif
            }
        })

        response.code(200)
        return response
    }

    async getActiveDay({params}, h) {
        console.log('Get Active Day')
        const { id } = params
        const hariAktif = await this._service.getAllActiveDay(id)
        const response = h.response({
            status: 'success',
            data: {
                hariAktif
            }
        })

        response.code(200)
        return response
    }

    async putActiveDay({payload, params}, h) {
        console.log('Update Active Day')
        const { id } = params

        const dayToUpdate = await this._service.getActiveDay(id)
        console.log(dayToUpdate.length)
        if (dayToUpdate.length == 0) {
            const response = h.response({
                status: 'fail',
                message: 'Data tidak ditemukan'
            })
            response.code(404)
            return response
        }

        await this._service.updateActiveDay(payload, id)
        const response = h.response({
            status: 'success',
            message: 'Data berhasil diubah',
        })
        response.code(201)
        return response
    }

    async deleteActiveDay({payload, params}, h) {
        console.log('Delete Active Day')
        const { id } = params

        const dayToDelete = await this._service.getActiveDay(id)
        
        if (dayToDelete.length == 0) {
            const response = h.response({
                status: 'fail',
                message: 'Data tidak ditemukan'
            })
            response.code(404)
            return response
        }

        // const deleteAction = await this._service.deleteActiveDay(id)
        const response = h.response({
            status: 'success',
            message: 'Data berhasil dihapus',
        })
        response.code(200)
        return response
    }

}

module.exports = ActiveDayHandler