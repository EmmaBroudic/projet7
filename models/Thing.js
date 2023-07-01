const mongoose = require('mongoose');

/*    userId: req.body.userId,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
    imageUrl: req.body.imageUrl */

const thingSchema = mongoose.Schema({
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
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model('Thing', thingSchema);