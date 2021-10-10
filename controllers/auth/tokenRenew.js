const { response } = require('express');
const tokenGenerator = require('../../helpers/jwt');


const tokenRenew = async ( req, res = response ) => {

    const { name, uid, email } = req;
    const token = await tokenGenerator( uid, name, email );

    res.json({
        ok: true,
        data: {
            email,
            name,
            uid,
            token
        }
    })
}
module.exports = tokenRenew;