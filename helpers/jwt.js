const jwt = require('jsonwebtoken');

/**
 * 
 * @param {string} uid 
 * @param {string} userName 
 * @param {string} email 
 */
const tokenGenerator = ( uid, userName, email ) => {

    return new Promise( (resolve, reject ) => {

        jwt.sign(
            { uid, userName, email },
            process.env.TOKEN_SECRET,
            ( err, token ) => {

                if ( err ) {

                    console.log( 'error generando token', err );
                    reject('Error generando token de usuario');

                } else {

                    resolve( token );

                }
            }
        );
    })
}

module.exports = tokenGenerator;