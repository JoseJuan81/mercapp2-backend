const mongoose = require('mongoose');

const CategorySchema = require('./Category');

const ItemSchema = mongoose.Schema({
    category: {
        type: CategorySchema,
        select: true,
    },
    description: {
        type: String,
        default: ''
    },
    historyPrice: {
        type: Array,
        default: []
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    numberOfTimesBuyed: {
        type: Number,
        default: 0
    },
    price: {},
}, { timestamps: true })

ItemSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = ItemSchema;