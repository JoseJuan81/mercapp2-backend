const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        uniqued: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model( 'users', UserSchema );