const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
    closed: {
        type: Boolean,
        default: false
    },
    closedDate: {
        type: Date
    },
    establishmentName: {
        type: String,
        required: true,
        index: true
    },
    insumos: {
        type: Array,
        select: true
    },
    total: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true })

PurchaseSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = mongoose.model( 'purchases', PurchaseSchema );