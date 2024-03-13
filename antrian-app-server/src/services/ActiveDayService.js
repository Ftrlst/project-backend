const pool = require('../utils/Pool')
const InvariantError = require('../exceptions/InvariantError')

class ActiveDayService {
    constructor () {
        this._pool = pool

        this.addActiveDay = this.addActiveDay.bind(this)
    }

    addActiveDay({tanggal, label, jam, kuota_online:kuotaOnline, kuota_ots:kuotaOts}) {
        console.log('service add active day triggered')
        const pool = this._pool

        return new Promise((resolve, reject) => {
            const query = {
                sql: 'INSERT INTO hari_aktif (label, tanggal, jam_pelayanan, kuota_online, kuota_ots)VALUES(?,?,?,?,?)',
                values: [label, tanggal, jam, kuotaOnline, kuotaOts]
            }
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Menambahkan Data'))
                }
                resolve(result.insertId)
            })    
        })

    }

    updateActiveDay({tanggal, label, jam, kuota_online:kuotaOnline, kuota_ots:kuotaOts}, id) {

        return new Promise((resolve, reject) => {
            const query = {
                sql: 'UPDATE hari_aktif SET label=?, tanggal=?, kuota_online=?, kuota_ots=?, jam_pelayanan=? WHERE id=?',
                values: [label, tanggal, kuotaOnline, kuotaOts, jam, id]
            }
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Mengubah Data'))
                }
                resolve(result)
            })    
        })
    }

    getActiveDay(id) {
        const pool = this._pool

        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT * FROM hari_aktif WHERE id=?',
                values: [id]
            }
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    reject(new InvariantError('Gagal Mengambil Detail Hari Aktif'))
                }
                resolve(result)
            })    
        })
    }

    getAllActiveDay() {
        console.log('service getAllActiveDay triggered')

        return new Promise(function(resolve, reject) {
            const query = {
                sql: 'SELECT * FROM hari_aktif'
            }
    
            pool.query(query.sql, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal mengambil daftar hari aktif'))
                }
                console.log(result)
                resolve(result)
            })  
        })  
    }

    deleteActiveDay(id) {
        console.log('service getActiveDay triggered')
        const pool = this._pool

        return new Promise((resolve, reject) => {
            const query = {
                sql: 'DELETE FROM hari_aktif WHERE id=?',
                values: [id]
            }
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Menghapus Data'))
                }
                resolve(result)
            })    
        })
    }

}

module.exports = ActiveDayService