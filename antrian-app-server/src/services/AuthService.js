const InvariantError = require('../exceptions/InvariantError')
const pool = require('../utils/Pool'
)

class AuthService {
    constructor() {
        console.log('service')
    }

    createRefreshToken(token) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'INSERT INTO refresh_tokens (token)values(?)',
                values: [token]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal menyimpan refresh token'))
                }
                resolve(result)
            })
        }) 
    }

    verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT * FROM refresh_tokens WHERE token = ?',
                values: [token]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    reject(new InvariantError('Gagal menyimpan refresh token'))
                }
                if (!result.length) {
                    reject(new InvariantError('Refresh token tidak valid'))
                }
                resolve(token)
            })
        }) 
    }

    deleteRefreshToken(token) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'DELETE FROM refresh_tokens WHERE token = ?',
                values: [token]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal menghapus refresh token'))
                }
                resolve()
            })
        }) 
    }
}

module.exports = AuthService