const { response } = require('express');


const tokenRenew = ( req, res = response ) => {

    res.json({
        ok: true,
        msg: 'Renovar token de usuario'
    })
}
module.exports = tokenRenew;