const Book = require('../models/Book');

exports.rateBook = (req, res, next) => {

  const newRating = {
    userId: req.auth.userId,
    grade: req.body.rating,
  };

  Book.findOne({ _id: req.params.id })
  .then(book => {
    console.log(book);
    book.ratings.push(newRating);
    console.log(book);
    book.save();
  })
  .then(() => {
    res.status(201).json({ message: 'Rating enregistré !' });
  })
  .catch(error => {
    res.status(400).json({ error });
  });
};