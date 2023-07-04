const Book = require('../models/Book');

exports.rateBook = (req, res, next) => {
  const newRating = {
    userId: req.auth.userId,
    grade: req.body.rating,
  };

  Book.findOne({ _id: req.params.id })
    .then(book => {
      book.ratings.push(newRating);
      console.log(book);
      console.log("ok");
      return book.save();
    })
    .then(savedBook => {
      const ratings = savedBook.ratings;

      console.log(savedBook.ratings);

      let total = 0;

      for (let i = 0; i < ratings.length; i++) {
        total += ratings[i].grade;
      }

      const averageRating = (total / ratings.length).toFixed(2);

      savedBook.averageRating = averageRating;

      console.log(averageRating);
      /* le code fonctionne jusqu'ici"*/
      return savedBook.save();
    })
    .then(() => {
      res.status(201).json({ message: 'Rating enregistré !' });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};