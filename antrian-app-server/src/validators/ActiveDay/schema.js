const Joi = require('joi')

const PostActiveDayPayloadSchema = Joi.object({
    label: Joi.string().required(),
    jam: Joi.string().required(),
    tanggal: Joi.date().required(),
    kuota_online: Joi.number().required(),
    kuota_ots: Joi.number().required()
})

const PutActiveDayPayloadSchema = Joi.object({
    label: Joi.string().required(),
    jam: Joi.string().required(),
    tanggal: Joi.date().required(),
    kuota_online: Joi.number().required(),
    kuota_ots: Joi.number().required()
})

module.exports = { 
    PostActiveDayPayloadSchema, 
    PutActiveDayPayloadSchema
}