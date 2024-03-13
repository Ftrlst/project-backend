const InvariantError = require('../exceptions/InvariantError')
const pool = require('../utils/Pool')
const { encrypt, compare } = require('../utils/Bcrypt')

class AdminService {
    constructor() {
        this._pool = pool
    }

    verifyUserCredentials({username, password}) {
        return new Promise(async (resolve, reject) => {
            const { password:hash } = await this.getByUsername(username)
            
            const isValid = await compare(hash, password)
            console.log(isValid)
            if (!isValid) {
                reject(new InvariantError('Credentials is invalid'))
            }
            resolve()
        })
    }

    getByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT * FROM admin WHERE username=?',
                values: [username]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    reject(new InvariantError('Gagal mengambil data admin'))
                }
                if (!result.length) {
                    reject(new InvariantError('gagal mengambil data admin'))
                }
                resolve(result[0])
            })
        })
    }

    addAdmin({username, fullname, password}) {
        return new Promise(async (resolve, reject) => {
            const encryptedPassword = await encrypt(password)

            const query = {
                sql: 'INSERT INTO admin (username, fullname, password)VALUES(?, ?, ?)',
                values: [username, fullname, encryptedPassword]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal menambahkan Admin'))
                }
                resolve(result.insertId)
            })
        })
    }

    getOneAdmin(id) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT * FROM admin WHERE id=?',
                values: [id]
            }

            this._pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    reject(new InvariantError('Gagal mengambil data admin dari database'))
                }
                if (result.length > 0) {
                    resolve(result[0])
                } else {
                    resolve({})
                }
            })
        })
    }

    getAllAdmin() {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT * FROM admin'
            }

            this._pool.query(query.sql, null, function(err, result) {
                if (err) {
                    reject(new InvariantError('Gagal mengambil data admin dari database'))
                }
                resolve(result)
            })
        })
    }

}

module.exports = AdminService