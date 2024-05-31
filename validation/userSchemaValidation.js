const joi = require('joi')

const errorHandler = require('../middleware/errorHandler')
const commonStatusCode = require('../middleware/statusCode')

const schema = {
    userCreationSchema: joi.object({
        user_name: joi.string().required(),
        user_email: joi.string().email().required(),
        user_phone_number: joi.string().length(10).pattern(/^[0-9]+$/).required(),
        user_password: joi.string().required()
    })
}

exports.userCreationValidation = (req, res, next) => {
    const { error } = schema.userCreationSchema.validate(req.body)
    if (error) {
        errorHandler({
            statusCode: commonStatusCode.clientCodes.Bad_Request,
            message: error.details[0].message
        }, req, res, next)
    } else {
        next();
    }
}