const jwt = require('jsonwebtoken');

const commonStatusCode = require("../middleware/statusCode")
const commonErrorMessages = require("../middleware/errorMessages")
const errorHandler = require('../middleware/errorHandler')
const successMessage = require('../middleware/successMessage')
const successHandler = require('../middleware/successHandler')
const userService = require("../services/userService")
const verifyToken = require("../config/verify_jwt")

exports.createUserController = async (req, res, next) => {
    try {
        let body = req.body
        const checkUserData = await userService.checkUserExists({ user_email: body.user_email })
        // console.log('checkUserData', checkUserData)
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

exports.loginUserController = async (req, res, next) => {
    try {
        let body = req.body
        const checkUserData = await userService.checkUserExists({
            user_email: body.user_email,
            user_password: body.user_password
        })
        console.log('checkUserData', checkUserData)
        if (checkUserData) {
            const jwtToken = jwt.sign(checkUserData.toJSON(), process.env.secret_key, { expiresIn: '1h' });
            console.log('jwtToken', jwtToken)
            successHandler({
                statusCode: commonStatusCode.successCodes.OK,
                message: successMessage.Messages.LOGIN_SUCCESS_MESSAGE,
                token: jwtToken
            }, req, res, next)
        } else {
            errorHandler({
                statusCode: commonStatusCode.clientCodes.Bad_Request,
                message: commonErrorMessages.errorMessages.INVALID_CREDIENTIAL
            }, req, res, next)
        }
    } catch (error) {
        console.log('error', error)
        errorHandler({
            statusCode: commonStatusCode.serverCodes.Internal_Server_Error,
            message: error.message
        }, req, res, next)
    }
}

exports.listUserController = async (req, res, next) => {
    try {
        verifyToken.verifyJwtToken(req, res, next)
    } catch (error) {
        console.log('error', error)
        errorHandler({
            statusCode: commonStatusCode.serverCodes.Internal_Server_Error,
            message: error.message
        }, req, res, next)
    }
}