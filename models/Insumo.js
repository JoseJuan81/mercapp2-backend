const mongoose = require('mongoose');

const InsumoSchema = mongoose.Schema({
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