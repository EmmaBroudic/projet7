const express = require('express');

const auth = require('../middlewares/auth');

const router = express.Router();

const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.getAllThings);
router.post('/', auth, booksCtrl.createThing);
router.get('/:id', booksCtrl.getOneThing);
router.put('/:id', auth, booksCtrl.modifyThing);
router.delete('/:id', auth, booksCtrl.deleteThing);

module.exports = router;