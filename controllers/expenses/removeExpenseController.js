const { response } = require('express');
const mongoose = require('mongoose');
const R = require('ramda');

const UserModel = require('../../models/User');

const removeExpenseController = async ( req, res = response ) => {

    try {
        const { uid: userId, params: { id } } = req;

        const userUpdated = await UserModel.updateOne(
            { _id: mongoose.Types.ObjectId( userId ) },
            { $pull: {
                expenses: {
                    _id: mongoose.Types.ObjectId( id )
                }
            }}
        );

        if ( !userUpdated ) {
            return UserNotExist( res ); 
        }

        return res.status( 201 ).json({
            ok: true,
            msg: 'Gasto eliminado exitosamente'
        })

    } catch (error) {
        
        console.log('Error eliminando un gasto', error);
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error creando el gasto',
            data: error,
        })
    }
}

const UserNotExist = ( res ) => {
    return res.status( 404 ).json({
        ok: false,
        msg: 'Usuario no existe',
    })
}

module.exports = removeExpenseController;