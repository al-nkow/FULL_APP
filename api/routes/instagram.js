const express = require('express');
const router = express.Router();
const InstaController = require('../controllers/instagram');

router.get('/', InstaController.get_posts);

module.exports = router;