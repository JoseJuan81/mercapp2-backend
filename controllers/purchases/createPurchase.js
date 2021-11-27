const { response } = require('express');

const Insumo = require('../../models/Insumo');
const PurchaseModel = require('../../models/Purchase');

const createPurchase = async ( req, res = response ) => {

    try {

        const { purchaseDate, ...rest } = req.body;
        const newPurchase = new PurchaseModel({ ...rest, date: purchaseDate });

        newPurchase.user = req.uid;

        const { insumos, establishmentName } = newPurchase;
        const lowerName = establishmentName.toLowerCase();
        const requests = [];

        insumos.forEach( ({ id, price }) => {
            const currentPrice = price[lowerName];
            requests.push(
                Insumo.updateOne(
                    { _id: id },
                    {
                        price: { ...price, [lowerName]: currentPrice },
                        $push: {
                            historyPrice: { price: currentPrice, establishmentName: lowerName, date: purchaseDate }
                        }
                    })
            )
        })

        Promise.all( requests )
            .then( () => console.log('insumos actualizados al actualizar nueva compra') )
            .catch( e => console.log('Error actualizando insumos desde neuva compra', e));

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