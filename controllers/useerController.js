const commonStatusCode = require("../middleware/statusCode")
const commonErrorMessages = require("../middleware/errorMessages")
const errorHandler = require('../middleware/errorHandler')
const successMessage = require('../middleware/successMessage')
const successHandler = require('../middleware/successHandler')
const userService = require("../services/userService")

exports.createUserController = async (req, res, next) => {
    try {
        let body = req.body
        const checkUserData = await userService.checkUserExists(body.user_email)
        console.log('checkUserData', checkUserData)
        if (checkUserData) {
            errorHandler({
                statusCode: commonStatusCode.clientCodes.Bad_Request,
                message: commonErrorMessages.errorMessages.Exists
            }, req, res, next)
        } else {
            const userCreationResult = await userService.createUserService(body)
            if (userCreationResult) {
                successHandler({
                    statusCode: commonStatusCode.successCodes.Created,
                    message: successMessage.Messages.USER_CREATED
                }, req, res, next)
            }
        }
    } catch (error) {
        errorHandler({
            statusCode: commonStatusCode.serverCodes.Internal_Server_Error,
            message: error.message
        }, req, res, next)
    }
}