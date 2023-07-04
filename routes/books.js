const express = require('express');

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer-config');

const router = express.Router();

const booksCtrl = require('../controllers/books');

const ratingsCtrl = require('../controllers/ratings');

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer, booksCtrl.createBook);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/:id/rating', auth, ratingsCtrl.rateBook);

module.exports = router;