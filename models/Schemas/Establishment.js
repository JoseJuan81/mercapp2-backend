const mongoose = require('mongoose');

const EstablishmentSchema = mongoose.Schema({
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            //[long, lat]
            type: [Number]
        }
    },
    logo: {
        type: Buffer
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true, 
    },
    numberOfTimesUsed: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

EstablishmentSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = EstablishmentSchema;