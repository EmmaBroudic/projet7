const Thing = require('../models/Thing');
const Rating = require('../models/Rating'); // Importez le modèle Thing correspondant

exports.rateBook = (req, res, next) => {
  
  const ratings = req.body;
  console.log(ratings);

  const addRatingAverage = req.body.rating;

  console.log(addRatingAverage);

  const newRating = new Rating({
    ...ratings,
    userId: req.auth.userId,
  });

  console.log(newRating);

  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      console.log(thing);
      thing.ratings.push(newRating);
      thing.averageRating = addRatingAverage;
      console.log(thing);
    })
    .then(() => {
      res.status(201).json({ message: 'Rating enregistré !' });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};