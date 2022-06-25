const mongoose = require('mongoose');
const { response } = require('express');

const UserModel = require('../../models/User');

const updateUserData = async ( req, res = response ) => {

    try {
        
        const filter = { _id: req.uid };
        const updatedData = { ...req.body };
        const options = { new: true,  };

        const user = await UserModel.findOneAndUpdate( filter, updatedData, options );

        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'usuario no encontrado'
            })
        }
    
        return res.status(201).json({
            ok: true,
            msg: 'Usuario actualizado con éxito',
            data: user
        });

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Error al actualizar usuario',
            data: error
        })
    }
}

module.exports = updateUserData;