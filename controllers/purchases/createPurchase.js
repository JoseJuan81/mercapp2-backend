const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const createPurchase = async ( req, res = response ) => {

    try {

        const newPurchase = new PurchaseModel( req.body );

        newPurchase.user = req.uid;
        const result = await newPurchase.save();
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Compra creada con id: ' + result.id,
            data: result
        })

    } catch ( err ) {
        console.log('Error al crear compra', err)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error al crear compra: ' + err
        })
    }

}

module.exports = createPurchase;