const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/members');

const passport = require('passport');
// const passportConf = require('../../passport');
const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/', passportJWT, MembersController.get_members);
router.post('/', MembersController.member_register);
router.post('/check', MembersController.member_by_email);
router.delete('/:memberId', passportJWT, MembersController.member_delete);

module.exports = router;