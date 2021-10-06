const { response } = require('express');
const jwt = require('jsonwebtoken');


const validatorToken = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msj: 'Usuario no autenticado'
        })
    }

    try {

        const user = jwt.verify(
            token,
            process.env.TOKEN_SECRET
        )

        req.uid = user.uid;
        req.name = user.userName;

    } catch (err) {
        console.log( 'error verificando token', err);
        return res.status( 401 ).json({
            ok: false,
            msj: 'Usuario no autenticado'
        })
    }

    next();
}

module.exports = validatorToken;