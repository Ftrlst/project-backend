const pool = require('../utils/Pool')
const InvariantError = require('../exceptions/InvariantError')

class AntrianOtsService {
    constructor () {
        this._pool = pool
    }

    addAntrian({ hari, no_peserta:noPeserta }, urutan) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'INSERT INTO antrian_ots (nomor_peserta, id_hari_aktif, urutan)VALUES(?, ?, ?)',
                values: [noPeserta, hari, urutan]
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

    getLastUrutan(hari) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: 'SELECT urutan FROM antrian_ots WHERE id_hari_aktif=? ORDER BY id DESC LIMIT 1',
                values: [hari]
            }
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Mengambil nomor terakhir'))
                }
                resolve(result)
            })    
        })
    }

    getAntrian(no_peserta) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: `SELECT * FROM antrian_ots 
                        LEFT JOIN hari_aktif 
                            ON antrian_ots.id_hari_aktif = hari_aktif.id 
                        WHERE antrian_ots.nomor_peserta=?
                        ORDER BY antrian_ots.id DESC LIMIT 1`,
                values: [no_peserta]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Mengambil data antrian peserta'))
                }
                resolve(result)
            })    
        })
    }

    deleteAntrian({hari, no_peserta}) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: `DELETE FROM antrian_ots WHERE id_hari_aktif=? AND nomor_peserta=?`,
                values: [hari, no_peserta]
            }
            console.log(query)
            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Menghapus data'))
                }
                resolve(result)
            }) 
        })
    }

    getAllAntrian(hari) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: `SELECT * FROM antrian_ots WHERE antrian_ots.id_hari_aktif=?
                        ORDER BY antrian_ots.urutan`,
                values: [ hari ]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal Mengambil data antrian peserta'))
                }
                resolve(result)
            })    
        })
    }

    countAntrian(hari) {
        return new Promise((resolve, reject) => {
            const query = {
                sql: `SELECT count(id) as jml FROM antrian_ots WHERE id_hari_aktif=?`,
                values: [ hari ]
            }

            pool.query(query.sql, query.values, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(new InvariantError('Gagal menghitung jumlah antrian online'))
                }
                resolve(result[0].jml)
            })    
        })
    }
}

module.exports = AntrianOtsService