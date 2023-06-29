const express = require('express');

/*const auth = require('auth');*/

const router = express.Router();

const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.getAllThings);
router.post('/', booksCtrl.createThing);
router.get('/:id', booksCtrl.getOneThing);
router.put('/:id', booksCtrl.modifyThing);
router.delete('/:id', booksCtrl.deleteThing);

module.exports = router;