class AuthHandler {
    constructor({authService, adminService}, tokenManager) {
        this._service = authService
        this._adminService = adminService
        this._tokenManager = tokenManager

        this.postAuth = this.postAuth.bind(this)
        this.putAuth = this.putAuth.bind(this)
        this.deleteAuth = this.deleteAuth.bind(this)
        
    }

    async postAuth({payload}, h) {

        try {
            await this._adminService.verifyUserCredentials(payload)
        } catch (err) {
            const response = h.response({
                status: 'failed',
                message: 'Gagal melakukan Autentikasi'
            })
            response.code(401)
    
            return response
        }


        const {id} = await this._adminService.getByUsername(payload.username)

        const accessToken = this._tokenManager.generateAccessToken({ id })
        const refreshToken = this._tokenManager.generateRefreshToken({ id })

        await this._service.createRefreshToken(refreshToken)

        const response = h.response({
            status: 'success',
            message: 'Login',
            data: { accessToken, refreshToken }
        })
        response.code(200)

        return response
    }

    async putAuth({payload}, h) {

        const { refreshToken } = payload

        try {
            await this._service.verifyRefreshToken(refreshToken)
            const { id } = this._tokenManager.verifyRefreshToken(refreshToken)
            console.log(id)

            const accessToken = this._tokenManager.generateAccessToken({id})
            
            const response = h.response({
                status: 'success',
                message: 'Access Token telah diperbarui',
                data: { accessToken }
            })
            response.code(200)
    
            return response

        } catch (err) {
            console.log(err)
            const response = h.response({
                status: 'Invalid',
                message: 'Refresh token tidak valid'
            })

            response.code(401)
            return response
        }

    }

    async deleteAuth({ payload }, h) {
        const { refreshToken } = payload
        try {
            // this._tokenManager.verifyRefreshToken(refreshToken)
            await this._service.verifyRefreshToken(refreshToken)
            await this._service.deleteRefreshToken(refreshToken)

            return {
                status:'success',
                message: 'Refresh token berhasil dihapus'
            }

        } catch (err) {
            const response = h.response({
                status: 'failed',
                message: err.message,
                data: { payload }
            })
            response.code(400)
    
            return response
        }
        
    }

    async postLoginAntrian() {

    }
}

module.exports = AuthHandler