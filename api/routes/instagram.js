const express = require('express');
const router = express.Router();
const InstaController = require('../controllers/instagram');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/', InstaController.get_posts);
router.get('/token', passportJWT, InstaController.get_token);
router.post('/', passportJWT, InstaController.set_token);

module.exports = router;