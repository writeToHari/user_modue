const jwt = require('jsonwebtoken');

const commonStatusCode = require("../middleware/statusCode")
const commonErrorMessages = require("../middleware/errorMessages")
const errorHandler = require('../middleware/errorHandler')
const successMessage = require('../middleware/successMessage')
const successHandler = require('../middleware/successHandler')

exports.verifyJwtToken = (req, res, next) => {
    try {
        jwt.verify(req.headers['authorization'], process.env.secret_key, (err, decoded) => {
            console.log('err', err)
            if (err) {
                errorHandler({
                    statusCode: commonStatusCode.clientCodes.Bad_Request,
                    message: commonErrorMessages.errorMessages.INVALID_CREDIENTIAL
                }, req, res, next)
            } else {
                successHandler({
                    statusCode: commonStatusCode.successCodes.OK,
                    message: successMessage.Messages.USER_DETAIL,
                    data: decoded
                }, req, res, next)
            }
        });
    } catch (error) {
        console.log("error", error)
        errorHandler({
            statusCode: commonStatusCode.clientCodes.Bad_Request,
            message: commonErrorMessages.errorMessages.INVALID_CREDIENTIAL
        }, req, res, next)
    }
}