const { response } = require('express');
const R = require('ramda');

const UserModel = require('../../models/User');

const updateExpenseController = async ( req, res = response ) => {

    try {
        const { uid: userId, params: { id }, body: expenseData } = req;

        const user = await UserModel.findByIdAndUpdate(
            userId,
            { $set: { "expenses.$[elem]": expenseData } },
            { arrayFilters: [{ "elem._id": id }] }
        );

        await user.save();

        return res.status( 201 ).json({
            ok: true,
            msg: 'Gasto actualizado exitosamente',
            data: user.expenses,
        })

    } catch (error) {
        
        console.log('Error actualizando un gasto', error);
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error actualizando el gasto',
            data: error,
        })
    }
}

module.exports = updateExpenseController;