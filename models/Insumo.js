const mongoose = require('mongoose');

const InsumoSchema = mongoose.Schema({
    labels: {
        type: Array,
        select: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    price: {},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true })

InsumoSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = mongoose.model( 'insumos', InsumoSchema );