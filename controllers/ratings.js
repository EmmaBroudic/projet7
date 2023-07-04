const Thing = require('../models/Thing');

exports.rateBook = (req, res, next) => {

  const newRating = {
    userId: req.auth.userId,
    grade: req.body.rating,
  };

  /*const newAverageRating = req.body.rating;*/

  Thing.findOne({ _id: req.params.id })
  .then(thing => {
    console.log(thing);
    thing.ratings.push(newRating);
    /*thing.averageRating.push(newAverageRating);*/
    console.log(thing);
    thing.save();
  })
  .then(() => {
    res.status(201).json({ message: 'Rating enregistré !' });
  })
  .catch(error => {
    res.status(400).json({ error });
  });
};