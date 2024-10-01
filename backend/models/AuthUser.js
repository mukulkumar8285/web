const mongoose = require("mongoose");


const AuthUser = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserLog = mongoose.model("UserLogin" , AuthUser);
module.exports = UserLog;