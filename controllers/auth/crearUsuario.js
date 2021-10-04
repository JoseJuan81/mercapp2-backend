const { response } = require('express');

const crearUsuario = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'Registro de sesion'
    })
}

module.exports = crearUsuario;
