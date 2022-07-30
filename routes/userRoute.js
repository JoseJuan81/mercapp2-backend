/**
 * @description Rutas de Datos del usuario
 * urlBase: /api/user
 */

const { Router } = require('express');

const getUserData = require('../controllers/user/getUserData');
const updateUserData = require('../controllers/user/updateUserData');

const validatorToken = require('../middlewares/tokenValidator');

const router = Router();

router.use( validatorToken );

router.get( '/', getUserData );
router.put( '/', updateUserData );

module.exports = router;