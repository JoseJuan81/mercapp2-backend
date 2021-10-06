const jwt = require('jsonwebtoken');

const tokenGenerator = ( uid, userName ) => {

    return new Promise( (resolve, reject ) => {

        jwt.sign(
            { uid, userName },
            process.env.TOKEN_SECRET,
            { expiresIn: '2h' },
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