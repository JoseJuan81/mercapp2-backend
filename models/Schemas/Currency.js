const mongoose = require('mongoose');

const CurrencySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    symbol: {
        type: String,
        required: true,
        trim: true
    },
    isoCode: {
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