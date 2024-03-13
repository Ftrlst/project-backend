class AdminHandler {
    constructor (adminService) {
        this._service = adminService

        this.postAdmin = this.postAdmin.bind(this)
        this.getAdmin = this.getAdmin.bind(this)
    }

    async postAdmin({payload}, h) {
        const insert = await this._service.addAdmin(payload)
        const response = h.response({
            status: 'success',
            data: {
                insertedId: insert
            }
        })

        response.code(200)
        return response
    }

    async getAdmin({params}, h) {
        const {id} = params 
        const admin = await this._service.getOneAdmin(id)

        const response = h.response({
            status: 'success',
            data: {
                admin: {
                    id: admin.id,
                    username: admin.username,
                    fullname: admin.fullname
                }
            }
        })

        response.code(200)
        return response
    }
}

module.exports = AdminHandler