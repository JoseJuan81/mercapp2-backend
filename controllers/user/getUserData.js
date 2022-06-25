const mongoose = require('mongoose');
const { response } = require('express');

const UserModel = require('../../models/User');

const getUserData = async ( req, res = response ) => {

    const userData = await UserModel.findById( req.uid );

    return res.status( 200 ).json({
        ok: true,
        msg: 'obtener datos del usuario',
        data: userData
    })
}

module.exports = getUserData;