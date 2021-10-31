const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const deleteInsumo = async ( req, res = response ) => {

    try {

        const { id } = req.params;
        await InsumosModel.findOneAndDelete({ '_id': id, 'user': req.uid });
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Insumo eliminado',
        })

    } catch ( err ) {
        console.log('Error al eliminar insumo', err)
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error: id no existe o usuario no tiene permiso para eliminar'
        })
    }

}

module.exports = deleteInsumo;