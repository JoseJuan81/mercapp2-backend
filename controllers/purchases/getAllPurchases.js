const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const getAllPurchases = async ( req, res = response ) => {

    const purchases = await PurchaseModel.find();

    return res.status( 200 ).json({
        ok: true,
        msg: 'obtener todos las compras',
        data: purchases
    })
}

module.exports = getAllPurchases;