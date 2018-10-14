const express = require('express');
const router = express.Router();
const DocsController = require('../controllers/documents');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const multer = require('multer'); // file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // 2 mb file size allowed
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true); // accept file
    } else {
      cb(null, false); // reject file
    }
  }
});

router.post('/', passportJWT, upload.single('document'), DocsController.doc_create);
router.get('/', passportJWT, DocsController.doc_get_all);
router.delete('/:docId', passportJWT, DocsController.doc_delete);

module.exports = router;



