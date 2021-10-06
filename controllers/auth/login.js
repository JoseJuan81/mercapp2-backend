const { response } = require('express');
const bycript = require('bcryptjs');

const User = require('../../models/User');
const tokenGenerator = require('../../helpers/jwt');

const login = async ( req, res = response ) => {
    
    try {

        const user = await User.findOne({ email: req.body.email });

        if ( !user ) {

            return res.status( 400 ).json({
                ok: false,
                msg: 'Correo o contrasena invalidos'
            })

        }

        const validPassword = bycript.compareSync( req.body.password, user.password );

        if ( !validPassword ) {

            return res.status( 400 ).json({
                ok: false,
                msg: 'Correo o contrasena invalidos'
            })
            
        }

        const token = await tokenGenerator( user.id, user.name );

        return res.status( 200 ).json({
            ok: true,
            msg: 'Inicio de sesion exitoso',
            data: {
                name: user.name,
                email: user.email,
                uid: user.id,
                token
            }
        })

    } catch (err) {
        console.log('Error al iniciar sesion', err);
        throw new Error('Error al iniciar sesion', err);
    }

}

module.exports = login;
