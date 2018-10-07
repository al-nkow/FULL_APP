const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const FaqController = require('../controllers/faq');

const passport = require('passport');
// const passportConf = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.post('/', passportJWT, FaqController.faq_create);
router.get('/', passportJWT, FaqController.faq_get_all);
router.delete('/:faqId', passportJWT, FaqController.faq_delete);
router.put('/:faqId', passportJWT, FaqController.faq_update);

module.exports = router;