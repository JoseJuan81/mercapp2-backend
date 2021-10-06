/**
 * @description Rutas de Usuario / Auth
 * ruta: /api/auth
 */

 const { Router } = require('express');
 const { check } = require('express-validator');

 const login = require('../controllers/auth/login');
 const crearUsuario = require('../controllers/auth/crearUsuario');
 const tokenRenew = require('../controllers/auth/tokenRenew');

 const fieldsValidator = require('../middlewares/fieldsValidator');
const validatorToken = require('../middlewares/tokenValidator');

 const router = Router();

 router.post( '/', [
    check( 'email', 'El correo es incorrecto' ).isEmail(),
    check( 'password', 'La contrasena es incorrecta' ).isLength({ min: 6, max: 15 }),
    fieldsValidator
 ], login );

 router.post( '/new', [
     check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
     check( 'email', 'El correo es incorrecto' ).isEmail(),
     check( 'password', 'La contrasena debe tener al menos 6 caracteres' ).isLength({ min: 6 }),
     fieldsValidator
 ], crearUsuario );

 router.get( '/renew',[
    validatorToken
 ], tokenRenew );

 module.exports = router;