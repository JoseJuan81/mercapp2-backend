const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const deleteInsumo = async ( req, res = response ) => {

    try {

        const { params: { id }, uid } = req;
        const response = await InsumosModel.findOneAndDelete({ '_id': id, 'user': uid });
    
        return res.status( 201 ).json({
            ok: true,
            msg: 'Insumo eliminado',
            data: response
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