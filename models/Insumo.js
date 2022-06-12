const mongoose = require('mongoose');

const categorySchema = require('./Schemas/Category');

const InsumoSchema = mongoose.Schema({
    category: {
        type: categorySchema,
        index: true,
        select: true,
        default: { name: '', description: '' }
    },
    image: {
        type: String,
        default: ''
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    labels: {
        type: Array,
        select: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
    price: {},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    historyPrice: {
        type: Array,
        default: []
    }
}, { timestamps: true })

InsumoSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = mongoose.model( 'insumos', InsumoSchema );