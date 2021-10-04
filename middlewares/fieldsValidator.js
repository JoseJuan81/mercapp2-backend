const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldsValidator = ( req, res = response, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json({
            ok: false,
            data: errors.mapped()
        })
    }

    next();
}

module.exports = fieldsValidator;