const mongoose = require('mongoose');
const { response } = require('express');
const { isEmpty, isNil } = require('ramda');

const UserModel = require('../../models/User');

const getUserData = async ( req, res = response ) => {

    const userData = await UserModel.findById( req.uid );

    if ( isEmpty( userData ) || isNil(userData) ) {
        return res.status( 404 ).json({
            ok: false,
            msg: 'El usuario no existe',
            data: []
        })
    }

    return res.status( 200 ).json({
        ok: true,
        msg: 'Usuario existe :: Datos del usuario',
        data: userData
    })
}

module.exports = getUserData;