require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoConnection = require('./db/config');

const authRoutes = require('./routes/auth');
const insumosRoutes = require('./routes/insumos');
const purchaseRoutes = require('./routes/purchase');

const app = express();

// Contectarse a MongoDB
mongoConnection();

// MIDDELWARES
// cors
app.use( cors() );

// con esto se accede al directorio public y se usan esos estaticos
app.use( express.static('public') );

// con este middleware de express se parsea toda la informacion del body en formato tipo json
app.use( express.json() );

// RUTAS
app.use( '/api/auth', authRoutes );
app.use( '/api/insumos', insumosRoutes );
app.use( '/api/purchases', purchaseRoutes );

const port = process.env.PORT;
app.listen( port, () => {
    console.log('\x1b[36m%s\x1b[0m','Servidor escuchando por el puerto', port)
})