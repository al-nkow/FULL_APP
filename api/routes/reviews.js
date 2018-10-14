const express = require('express');
const router = express.Router();
const ReviewsController = require('../controllers/reviews');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const multer = require('multer'); // file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname) // cb(null, file.filename)
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2 mb file size allowed
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // accept file
    } else {
      cb(null, false); // reject file
    }
  }
});

router.post('/', passportJWT, upload.single('reviewImage'), ReviewsController.review_create);
router.get('/', passportJWT, ReviewsController.reviews_get_all);
router.delete('/:reviewId', passportJWT, ReviewsController.review_delete);
router.put('/:reviewId', passportJWT, upload.single('reviewImage'), ReviewsController.review_update);

module.exports = router;



