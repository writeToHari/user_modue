const userSchema = require('../models/userSchema')

exports.createUserService = async (body) => {
    return userSchema.create(body);
}

exports.checkUserExists = async (email) => {
    return userSchema.findOne({ user_email: email })
}