const { response } = require('express');
const mongoose = require('mongoose');

const InsumosModel = require('../../models/Insumo');

const getAllEstablishment = async ( req, res = response ) => {

    /**
     * @return type Array - [{establishment: "nombre"}]
     */
    const establishments = await InsumosModel.aggregate([
        // filtrar por usuario los insumos
        {
            $match: {
                user: mongoose.Types.ObjectId( req.uid )
            }
        },
        // agregar campo establishment y transformar de objeto price a arreglo
        {
            $addFields: {
                establishment: {
                    $objectToArray: '$price'
                }
            }
        },
        // recorrer el arreglo y seleccionar solo el valor de k 
        // [{k: "wong", v: 24}]
        {
            $addFields: {
                establishment: {
                    $map: {
                        input: '$establishment', 
                        as: 'priceElement', 
                        in: '$$priceElement.k'
                    }
                }
            }
        },
        // extraer valores de campo establishment
        {
            $unwind: {
                path: '$establishment'
            }
        },
        // agrupar colecciones por nombre de establishment
        {
            $group: {
                _id: '$establishment'
            }
        },
        // establecer valor anterior en el campo establishment
        // eliminar campo _id
        {
            $set: {
                establishment: '$_id', 
                _id: '$$REMOVE'
            }
        }
    ]);


    return res.status( 200 ).json({
        ok: true,
        msg: 'obtener todos los establecimientos de compra',
        data: establishments
    })
}

module.exports = getAllEstablishment;