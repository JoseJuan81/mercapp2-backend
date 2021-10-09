/**
 * @description Rutas de Insumos
 * urlBase: /v/insumos
 * /v/insumos/
 * /v/insumos/:id
 */

 const { Router } = require('express');
const { check } = require('express-validator');

const getAllInsumos = require('../controllers/insumos/getAllInsumos');
const getInsumo = require('../controllers/insumos/getInsumo');
const createInsumo = require('../controllers/insumos/createInsumo');
const updateInsumo = require('../controllers/insumos/updateInsumo');
const deleteInsumo = require('../controllers/insumos/deleteInsumo');

const fieldsValidator = require('../middlewares/fieldsValidator');
const validatorToken = require('../middlewares/tokenValidator');

 const router = Router();

 router.use( validatorToken );

 router.get( '/', getAllInsumos );
 router.get( '/:id', getInsumo );

 router.post( '/', [
     check('name', 'El nombre del insumo es requerido').notEmpty(),
     fieldsValidator
 ], createInsumo );

 router.put( '/:id', [
    check('name', 'El nombre del insumo es requerido').notEmpty(),
    fieldsValidator
 ], updateInsumo );

 router.delete( '/:id', deleteInsumo );

 module.exports = router;