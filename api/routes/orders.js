const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

const passport = require('passport');
const passportConf = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

// All routes here starts with /orders/
router.get('/', passportJWT, OrdersController.orders_get_all);
router.post('/', passportJWT, OrdersController.orders_create_order);
router.get('/:orderId', passportJWT, OrdersController.orders_get_order);
router.delete('/:orderId', passportJWT, OrdersController.orders_delete_order);

module.exports = router;