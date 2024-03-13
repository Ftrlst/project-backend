const Joi = require('joi')

const PostAntrianOnlinePayloadSchema = Joi.object({
    hari: Joi.number().required(),
    no_peserta: Joi.string().length(10).required(),
})

const DeleteAntrianOnlinePayloadSchema = Joi.object({
    hari: Joi.number().required(),
    no_peserta: Joi.number().required()
})
module.exports = { PostAntrianOnlinePayloadSchema, DeleteAntrianOnlinePayloadSchema }