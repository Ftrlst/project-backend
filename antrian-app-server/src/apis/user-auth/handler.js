class UserAuthHandler {
    constructor({userService}) {
        this._service = userService

        this.postUserAuth = this.postUserAuth.bind(this)
        this.putUserAuth = this.putUserAuth.bind(this)
        this.deleteUserAuth = this.deleteUserAuth.bind(this)
    }

    async postUserAuth({payload}, h) {
        return {
            payload,
            message: 'Post User Auth'
        }
    }

    async putUserAuth({payload}, h) {
        return {
            payload,
            message: 'Put User Auth'
        }
    }

    async deleteUserAuth({payload}, h) {
        return {
            payload,
            message: 'Delete User Auth'
        }
    }

}

module.exports = UserAuthHandler