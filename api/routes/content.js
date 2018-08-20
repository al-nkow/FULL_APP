const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ContentController = require('../controllers/content');

const passport = require('passport');
// const passportConf = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/', passportJWT, ContentController.content_create);
router.get('/', passportJWT, ContentController.content_get);
// router.delete('/:orderId', checkAuth, OrdersController.orders_get_order);

module.exports = router;