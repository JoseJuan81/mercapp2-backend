const mongoose = require('mongoose');

const CategorySchema = require('./Category');
const EstablishmentSchema = require('./Establishment');
const ItemSchema = require('./Item');

const ExpenseSchema = mongoose.Schema({
	amount: {
		type: Number,
		required: [true, 'El campo "amount" es requerido para crear un expense'],
		validate: val => Number( val.toFixed(2) ),
	},
    category: {
        type: CategorySchema,
		required: [true, 'El campo "category" es requerido para crear un expense'],
    },
	establishment: {
		type: EstablishmentSchema,
		required: [true, 'El campo "establishment" es requerido para crear un expense'],
	},
	date: {
        type: Date,
		required: [true, 'El campo "date" es requerido para crear un expense'],
    },
    items: {
        type: [ItemSchema],
        default: [],
    },
}, { timestamps: true })

ExpenseSchema.method('toJSON', function() {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;

    return rest;
})

module.exports = ExpenseSchema;