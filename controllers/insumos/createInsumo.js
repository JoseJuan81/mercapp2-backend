const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const createInsumo = async ( req, res = response ) => {

    // verificar si ya existe insumo con ese nombre
    const exist = await InsumosModel.findOne({ name: req.body.name });
    if ( exist ) {
        return res.status( 400 ).json({
            ok: false,
            msg: 'Ya existe un insumo con nombre: ' + req.body.name,
        }) 
    }

    try {

        const newInsumo = new InsumosModel( req.body );
        newInsumo.user = req.uid;
        const result = await newInsumo.save();
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Insumo creado con id: ' + result.id,
            data: result
        })

    } catch ( err ) {
        console.log('Error al crear insumo', err)
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear insumo'
        })
    }

}

module.exports = createInsumo;