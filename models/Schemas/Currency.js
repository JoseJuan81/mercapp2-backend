const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    }
}, { timestamps: true })

CurrencySchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = CurrencySchema;