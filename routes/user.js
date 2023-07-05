/* Routes de l'API correspondant aux requêtes POST
d'un utilisateur qui souhaite créer un compte ou se
connecter à l'application */

const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;