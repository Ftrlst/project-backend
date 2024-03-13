const bcrypt = require('bcrypt')
const saltRound = 10

const encrypt = plaintext => {
    console.log(plaintext)
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRound, function(err, salt) {
            bcrypt.hash(plaintext, salt, function(err, hash) {
                console.log(hash)
                if (err) {
                    reject(new Error('Fail to generate hash'))
                }
                resolve(hash)
            })
        })
    })
}

const compare = (hash, plaintext) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintext, hash, function(err, result) {
            if (err) {
                reject(new Error('Invalid'))
            }
            resolve(result)
        })
    })
}

module.exports = { encrypt, compare }