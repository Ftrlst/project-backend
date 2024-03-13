const { PostAntrianOnlinePayloadSchema, DeleteAntrianOnlinePayloadSchema } = require('./schema')
const Invariant = require('../../exceptions/InvariantError')

const AntrianOnlineValidator = {
    validatePostAntrianOnlinePayload: (payload) => {
        const result = PostAntrianOnlinePayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    },

    validateDeleteAntrianOnlinePayload: (payload) => {
        const result = DeleteAntrianOnlinePayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    }
}

module.exports = AntrianOnlineValidator
