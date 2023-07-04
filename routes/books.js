const express = require('express');

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer-config');

const router = express.Router();

const booksCtrl = require('../controllers/books');

const ratingsCtrl = require('../controllers/ratings');

router.get('/', booksCtrl.getAllThings);
router.post('/', auth, multer, booksCtrl.createThing);
router.get('/:id', booksCtrl.getOneThing);
router.put('/:id', auth, multer, booksCtrl.modifyThing);
router.delete('/:id', auth, booksCtrl.deleteThing);
router.post('/:id/rating', auth, ratingsCtrl.rateBook);

module.exports = router;