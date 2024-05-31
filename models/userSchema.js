const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        default: ""
    },
    user_phone_number: {
        type: String,
        default: ""
    },
    user_email: {
        type: String,
        default: ""
    },
    user_password: {
        type: String,
        default: ""
    },
    is_active: {
        type: Number,
        default: 1
    },
    is_deleted: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true,
});


var userModel = mongoose.model('users', userSchema);
module.exports = userModel