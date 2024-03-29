const { response } = require('express');
const bycript = require('bcryptjs');

const User = require('../../models/User');
const tokenGenerator = require('../../helpers/jwt');

const crearUsuario = async ( req, res = response ) => {

    try {
        
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if ( user ) {

            return res.status( 400 ).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo'
            })

        }

        user = new User( req.body );
        const salt = bycript.genSaltSync();
        user.password = bycript.hashSync( password, salt );
        
        const userData = await user.save();

        const token = await tokenGenerator( userData.id, userData.name, email );

        res.status( 201 ).json({
            ok: true,
            msg: 'Usuario registrado con exito',
            data: {
                uid: userData.id,
                name: userData.name,
                email: userData.email,
                token
            }
        })

    } catch (error) {
        console.log('error al crear usuario', JSON.stringify(error, null, 2));

        return res.status(400).json({
            ok: false,
            msg: 'No fue posible crear al usuario',
            data: error
        })
    }

}

module.exports = crearUsuario;
