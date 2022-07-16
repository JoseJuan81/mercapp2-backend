/**
 * @description Rutas de Datos del usuario
 * urlBase: /api/user
 */

const { Router } = require('express');

const updateUserData = require('../controllers/user/updateUserData');

const validatorToken = require('../middlewares/tokenValidator');

const router = Router();

router.use( validatorToken );

router.put( '/', updateUserData );

module.exports = router;