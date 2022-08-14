/**
 * @description Rutas de Gastos
 * urlBase: /api/expenses
 */

const { Router } = require('express');

const createNewExpenseController = require('../controllers/expenses/createNewExpenseController');
const removeExpenseController = require('../controllers/expenses/removeExpenseController');
const updateExpenseController = require('../controllers/expenses/updateExpenseController');

const validatorToken = require('../middlewares/tokenValidator');

const router = Router();

router.use( validatorToken );

router.put( '/new', createNewExpenseController );

router.delete( '/remove/:id', removeExpenseController );

router.put( '/update-one/:id', updateExpenseController );

module.exports = router;

