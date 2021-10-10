const { response } = require('express');
const tokenGenerator = require('../../helpers/jwt');


const tokenRenew = async ( req, res = response ) => {

    const { name, uid } = req;
    const token = await tokenGenerator( uid, name );

    res.json({
        ok: true,
        data: {
            name,
            uid,
            token
        }
    })
}
module.exports = tokenRenew;