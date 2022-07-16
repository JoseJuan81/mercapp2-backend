const mongoose = require('mongoose');

const CurrencySchema = require('./Schemas/Currency');
const CategorySchema = require('./Schemas/Category');
const EstablishmentSchema = require('./Schemas/Establishment');
const ExpenseSchema = require('./Schemas/Expenses');
const ItemSchema = require('./Schemas/Item');

const CONSTANTS = require('./../helpers/constant.js');

const UserSchema = mongoose.Schema({
    avatar: {
        type: Buffer,
    },
    categories: {
        type: [CategorySchema],
        default: CONSTANTS.category
    },
    currencies: {
        type: [CurrencySchema],
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    establishments: {
        type: [EstablishmentSchema],
        default: []
    },
    expenses: {
        type: [ExpenseSchema],
        default: [],
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
    name: {
        type: String,
        required: true
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