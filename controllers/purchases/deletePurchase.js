const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const deletePurchase = async ( req, res = response ) => {

    try {

        const { id } = req.params;
        await PurchaseModel.findByIdAndDelete( id );
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Compra eliminada',
        })

    } catch ( err ) {
        console.log('Error al eliminar compra', err)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Ocurrio un error al eliminar la compra'
        })
    }

}

module.exports = deletePurchase;