const pool = require('../utils/Pool')

class UserService {
    constructor() {

    }

    getByCredentials({noPeserta, tglLahir}) {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    createRefreshToken(token) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'INSERT INTO login_user (token, created_at)VALUES(?, CURRENT_TIMESTAMP())'
            }
        })
    }

    verifyRefreshToken() {

    }

    deleteRefreshToken() {

    }
}

module.exports = UserService