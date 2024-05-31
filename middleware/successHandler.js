const successHandler = (successResponse, req, res, next) => {
    const statusCode = successResponse.statusCode
    const message = successResponse.message

    res.status(statusCode).json({
        success: true,
        status: statusCode,
        message: message
    });
};

module.exports = successHandler;