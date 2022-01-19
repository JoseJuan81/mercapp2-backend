const mongoose = require('mongoose');
const { response } = require('express');

const PurchaseModel = require('../../models/Purchase');

const getAllPurchases = async ( req, res = response ) => {

    const purchases = await PurchaseModel.find({ user: req.uid }).sort({ createdAt: -1 });

    return res.status( 200 ).json({
        ok: true,
        msg: 'obtener todas las compras',
        data: purchases
    })
}

module.exports = getAllPurchases;