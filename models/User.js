const mongoose = require('mongoose');

const Currency = require('./Schemas/Currency');
const Establishment = require('./Schemas/Establishment');
const Category = require('./Schemas/Category');

const UserSchema = mongoose.Schema({
    avatar: {
        type: Buffer,
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        default: [Category]
    },
    currencies: {
        type: Array,
        default: [Currency]
    },
    email: {
        type: String,
        require: true,
        uniqued: true
    },
    establisments: {
        type: Array,
        default: [Establishment]
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