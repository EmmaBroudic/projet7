/* Routes de l'API correspondant aux requêtes GET,
POST, PUT, DELETE de récupération, création,
modification, suppression, notation et calcul
de la moyenne de notation des objets livres.
Certaines nécessitent d'être identifié (auth) et/ou
utilisent le middleware multer */

const express = require('express');

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer-config');

const sharp = require('../middlewares/sharp-config');

const router = express.Router();

const booksCtrl = require('../controllers/books');

const ratingsCtrl = require('../controllers/ratings');

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer, sharp.resizeImage, booksCtrl.createBook);
router.get('/bestrating', booksCtrl.getBestBooks);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, sharp.resizeImage, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/:id/rating', auth, ratingsCtrl.rateBook);

module.exports = router;