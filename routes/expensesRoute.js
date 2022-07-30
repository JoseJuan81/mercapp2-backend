/**
 * @description Rutas de Gastos
 * urlBase: /api/expenses
 */

const { Router } = require('express');

const createNewExpenseController = require('../controllers/expenses/createNewExpenseController');

const validatorToken = require('../middlewares/tokenValidator');

const router = Router();

router.use( validatorToken );

router.put( '/new', createNewExpenseController );

module.exports = router;

