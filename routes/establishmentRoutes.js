/**
 * @description Rutas de Establecimientos
 * urlBase: /api/establishment
 */

const { Router } = require('express');

const getAllEstablishment = require('../controllers/establishment/getAllEstablishment');

const validatorToken = require('../middlewares/tokenValidator');

 const router = Router();

 router.use( validatorToken );

 router.get( '/', getAllEstablishment );
 
 module.exports = router;