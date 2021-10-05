require('dotenv').config();

const express = require('express');
const mongoConnection = require('./db/config');

const authRoutes = require('./routes/auth')

const port = process.env.PORT;

const app = express();

mongoConnection();

// MIDDELWARES

// DIRECTORIO PUBLICO
// con esto se accede al directorio public
app.use( express.static('public') );

// PARSEO DE BODY A JSON
// con este middleware de express se parsea toda la informacion del body en formato tipo json
app.use( express.json() );

// RUTAS
app.use( '/api/auth', authRoutes );

app.listen( port, () => {
    console.log(`Servidor escuchando por el puerto ${ port }`)
})