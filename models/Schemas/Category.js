const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String
    }
})

categorySchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = categorySchema;