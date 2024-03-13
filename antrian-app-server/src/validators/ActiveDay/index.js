const { PostActiveDayPayloadSchema, PutActiveDayPayloadSchema } = require('./schema')
const Invariant = require('../../exceptions/InvariantError')

const ActiveDayValidator = {
    validatePostActivedDayPayload: (payload) => {
        const result = PostActiveDayPayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    },

    validatePutActiveDayPayload: (payload) => {
        const result = PutActiveDayPayloadSchema.validate(payload)
        if (result.error) {
            throw new Invariant(result.error.message)
        }
    }
}

module.exports = ActiveDayValidator
