/* Dans ce bloc de code, on trouve le schéma qui permettra
de mettre en forme les données utilisateur (email
et mot de passe) qui seront stockées dans la BDD sous
un modèle défini */

const mongoose = require('mongoose');

// Plugin Mongoose pour la validation unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);