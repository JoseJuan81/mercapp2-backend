const mongoose = require('mongoose');

const mongoConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_CONNECTION );
        console.log('\x1b[35m%s\x1b[0m','Conectado a mongo :)')
        
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m','error al conectarse a mongo', error)
        throw new Error('Error al conectarse con la BD');
    }
}

module.exports = mongoConnection;