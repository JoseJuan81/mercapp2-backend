/**
 * @description Rutas de Establecimientos
 * urlBase: /api/establishment
 */

const { Router } = require('express');

const getUserData = require('../controllers/user/getUserData');

const validatorToken = require('../middlewares/tokenValidator');

 const router = Router();

 router.use( validatorToken );

 router.get( '/data', getUserData );
 
 module.exports = router;