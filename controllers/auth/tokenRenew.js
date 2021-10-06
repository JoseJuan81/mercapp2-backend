const { response } = require('express');
const tokenGenerator = require('../../helpers/jwt');


const tokenRenew = async ( req, res = response ) => {

    const token = await tokenGenerator( req.uid, req.name );

    res.json({
        ok: true,
        token
    })
}
module.exports = tokenRenew;