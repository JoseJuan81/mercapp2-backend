const mongoose = require('mongoose');

const mongoConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_CONNECTION );
        console.log('Conectado a mongo :)')
        
    } catch (error) {
        console.log('error al conectarse a mongo', error)
        throw new Error('Error al conectarse con la BD');
    }
}

module.exports = mongoConnection;