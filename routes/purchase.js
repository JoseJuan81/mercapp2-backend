/**
 * @description Rutas de Compras
 * urlBase: /api/purchases
 * /api/purchases/
 * /api/purchases/:id
 */

 const { Router } = require('express');
const { check } = require('express-validator');

const createPurchase = require('../controllers/purchases/createPurchase');
const deletePurchase = require('../controllers/purchases/deletePurchase');
const getAllPurchases = require('../controllers/purchases/getAllPurchases');
const getPurchase = require('../controllers/purchases/getPurchase');
const updatePurchase = require('../controllers/purchases/updatePurchase');

const fieldsValidator = require('../middlewares/fieldsValidator');
const validatorToken = require('../middlewares/tokenValidator');

 const router = Router();

 router.use( validatorToken );

 router.get( '/', getAllPurchases );
 router.get( '/:id', getPurchase );

 router.post( '/new', [
     check('establishmentName', 'El establecimiento es requerido').notEmpty(),
     fieldsValidator
 ], createPurchase );

 router.put( '/:id', [
    check('name', 'El nombre de la compra es requerida').notEmpty(),
    fieldsValidator
 ], updatePurchase );

 router.delete( '/:id', deletePurchase );

 module.exports = router;