const { response } = require('express');


const login = ( req, res = response ) => {

    const loginUserData = req.body;

    return res.status(200).json({
        ok: true,
        msg: 'Inicio de sesion',
        data: loginUserData
    })
}

module.exports = login;
