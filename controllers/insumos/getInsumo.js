const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const getInsumo = async ( req, res = response ) => {

    const { params: { id }, uid } = req;

    try {

        const insumo = await InsumosModel.find({ '_id': id, 'user': uid }).populate( 'user', ['name', 'email'] );

        return res.status( 200 ).json({
            ok: true,
            msg: 'obtener un insumo por id',
            data: insumo[0]
        })

    } catch ( err ) {
        console.log('Error al obtener insumo por id', id)
        return res.status( 404 ).json({
            ok: false,
            msg: 'Error: id incorrecto o usuario no puede acceder a informacion',
            data: undefined
        })
    }

}

module.exports = getInsumo;