const express = require('express');
const router = express.Router();
const PartnersController = require('../controllers/partners');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 30 // 2 mb file size allowed
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // accept file
    } else {
      cb(null, false); // reject file
    }
  }
});

router.post('/', passportJWT, upload.single('partnerImage'), PartnersController.partners_create);
router.get('/', passportJWT, PartnersController.partners_get_all);
router.delete('/:partnerId', passportJWT, PartnersController.partners_delete);

module.exports = router;



