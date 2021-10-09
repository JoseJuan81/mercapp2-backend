const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const getPurchase = async ( req, res = response ) => {

    const { id } = req.params;

    try {

        const purchase = await PurchaseModel.findById( id );
    
        if ( !purchase ) {
    
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe la compra con id: ' + id,
            })
    
        }
    
        return res.status( 200 ).json({
            ok: true,
            msg: 'obtener una compra por id',
            data: purchase
        })

    } catch ( err ) {
        console.log('Error al obtener la compra por id', id)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error al obtener la compra'
        })
    }

}

module.exports = getPurchase;