const express = require('express');

const router = express.Router();

const booksCtrl = require('../controllers/books');

/*const Thing = require('../models/Thing');*/

router.post('/', booksCtrl.createThing); 
router.put('/:id', booksCtrl.modifyThing);
router.delete('/:id', booksCtrl.deleteThing);
router.get('/:id', booksCtrl.getOneThing);
router.get('/', booksCtrl.getAllThing);

module.exports = router;