const Joi = require('joi')

const PostAntrianOtsPayloadSchema = Joi.object({
    hari: Joi.number().required(),
    no_peserta: Joi.string().length(10).required(),
})

const DeleteAntrianOtsPayloadSchema = Joi.object({
    hari: Joi.number().required(),
    no_peserta: Joi.number().required()
})
module.exports = { PostAntrianOtsPayloadSchema, DeleteAntrianOtsPayloadSchema }