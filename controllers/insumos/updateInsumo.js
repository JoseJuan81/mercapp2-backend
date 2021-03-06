const { response } = require('express');

const insertEstablishmentsLabels = require('../../helpers/insertEstablishmentsLabels');

const InsumosModel = require('../../models/Insumo');

const updateInsumo = async ( req, res = response ) => {

    try {

        const { uid, params: { id } } = req;
        
        const currentInsumo = await InsumosModel.findById( id );
        
        if ( ! currentInsumo ) {
            
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe el insumo con el id: ' + id
            })
            
        }

        if ( currentInsumo.user != uid ) {

            return res.status( 404 ).json({
                ok: false,
                msg: 'Acceso no permitido'
            })

        }

        const { price, labels } = req.body;
        const uniqueLabels = insertEstablishmentsLabels( price, labels );
        const insumoActualizado = await InsumosModel.findByIdAndUpdate( id, { ...req.body, labels: uniqueLabels }, { new: true } );
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Insumo actualizado con id: ' + id,
            data: insumoActualizado
        })

    } catch ( err ) {
        console.log('Error al actualizar insumo', err)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error al actualizar insumo'
        })
    }

}

module.exports = updateInsumo;