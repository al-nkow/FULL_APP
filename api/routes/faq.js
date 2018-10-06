const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const FaqController = require('../controllers/faq');

const passport = require('passport');
// const passportConf = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/', passportJWT, FaqController.faq_create);
router.get('/', passportJWT, FaqController.faq_get_all);
// router.delete('/:orderId', checkAuth, OrdersController.orders_get_order);

module.exports = router;