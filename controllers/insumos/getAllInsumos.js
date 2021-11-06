const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const getAllInsumos = async ( req, res = response ) => {

    const insumos = await InsumosModel
                            .find({ user: req.uid })
                            .sort({ name: 1 });

    return res.status( 200 ).json({
        ok: true,
        msg: 'obtener todos los insumos',
        data: insumos
    })
}

module.exports = getAllInsumos;