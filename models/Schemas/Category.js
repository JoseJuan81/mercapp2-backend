const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    description: {
        type: String
    },
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    numberOfTimesUsed: {
        type: Number,
        default: 0
    }
})

categorySchema.add({
    subCategory: {
        type: [categorySchema],
        dafault: []
    }
})

categorySchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = categorySchema;