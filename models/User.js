const mongoose = require('mongoose');

const Currency = require('./Schemas/Currency');
const Establishment = require('./Schemas/Establishment');
const Category = require('./Schemas/Category');

const CONSTANTS = require('./../helpers/constant.js');

const UserSchema = mongoose.Schema({
    avatar: {
        type: Buffer,
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [Category],
        default: CONSTANTS.category
    },
    currencies: {
        type: [Currency],
        default: CONSTANTS.currency
    },
    email: {
        type: String,
        require: true,
        uniqued: true
    },
    establishments: {
        type: [Establishment],
        default: []
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

UserSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = mongoose.model( 'users', UserSchema );