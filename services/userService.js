const userSchema = require('../models/userSchema')

exports.createUserService = async (body) => {
    return userSchema.create(body);
}

exports.checkUserExists = async (data) => {
    return userSchema.findOne(data)
}