const { response } = require('express');

const InsumosModel = require('../../models/Insumo');

const getInsumo = async ( req, res = response ) => {

    const { params: { id }, uid } = req;

    try {

        const insumo = await InsumosModel.findById( id ).populate( 'user', ['name', 'email'] );
    
        if ( !insumo ) {
    
            return res.status( 404 ).json({
                ok: false,
                msg: 'No existe el insumo con ese id'
            })
            
        }
        
        if ( uid !== insumo.user ) {

            return res.status( 404 ).json({
                ok: false,
                msg: 'Este insumo pertenece a otro usuario. No puede acceder a el'
            })

        }
    
        return res.status( 200 ).json({
            ok: true,
            msg: 'obtener un insumo por id',
            data: insumo
        })

    } catch ( err ) {
        console.log('Error al obtener insumo por id', id)
        return res.status( 400 ).json({
            ok: false,
            msg: 'Error al obtener el insumo con ese id'
        })
    }

}

module.exports = getInsumo;