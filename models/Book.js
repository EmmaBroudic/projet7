/* Dans ce bloc de code, on trouve le schéma qui permettra
de mettre en forme les données de l'objet livre
qui seront stockées dans la BDD sous
un modèle défini */

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings : [
      {
      userId : { type: String, required: true },
      grade : { type: Number, required: true }
      }
    ],
  imageUrl: { type: String, required: true },
  averageRating: { type: Number, required: true }
});

module.exports = mongoose.model('Book', bookSchema);