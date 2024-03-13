const { PostAntrianOtsPayloadSchema, DeleteAntrianOtsPayloadSchema } = require('./schema')
const Invariant = require('../../exceptions/InvariantError')

const AntrianOtsValidator = {
    validatePostAntrianOtsPayload: (payload) => {
        const result = PostAntrianOtsPayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    },

    validateDeleteAntrianOtsPayload: (payload) => {
        const result = DeleteAntrianOtsPayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    }
}

module.exports = AntrianOtsValidator
