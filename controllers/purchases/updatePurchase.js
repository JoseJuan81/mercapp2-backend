const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const updatePurchase = async ( req, res = response ) => {

    try {

        const { id } = req.params;
        const currentPurchase = await PurchaseModel.findById( id );

        if ( !currentPurchase ) {

            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe la compra con el id: ' + id
            })
        }

        const updatedPurchase = await PurchaseModel.findByIdAndUpdate( id, { ...req.body }, { new: true } );
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Compra actualizada con id: ' + id,
            data: updatedPurchase
        })

    } catch ( err ) {
        console.log('Error al actualizar compra', err)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error al actualizar compra'
        })
    }

}

module.exports = updatePurchase;