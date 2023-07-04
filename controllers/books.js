const Book = require('../models/Book');

const fs = require('fs');

exports.createBook = (req, res, next) => {
  console.log("Test :", req.body);
  const { book } = req.body;
  const bookObject = JSON.parse(book);
  /*delete bookObject._id;*/
  delete bookObject._userId;
  
  const data = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });

  data.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};


exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  })
    .then((book) => {/*
      const ratings = book.ratings;
      let total = 0;

      for (let i = 0; i < ratings.length; i++) {
        total += ratings[i].grade;
      }

      // calcul de la moyenne avec un maximum de deux chiffres après la virgule
      const averageRating = (total / ratings.length).toFixed(2);

      book = book.toObject();
      book.averageRating = averageRating;*/

      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifyBook = (req, res, next) => {
  const { book } = req.body;
  const bookObject = req.file ? {
      ...JSON.parse(book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({_id: req.params.id})
      .then((book) => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Livre modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
      .then(book => {
          if (book.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = book.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Book.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.getAllBooks = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getBestBooks = (req, res, next) => {
  Book.find()

    .then((books) => {

      console.log("ok");
      console.log(books);
/*
      const averages = books.map((book) => ({
        averageRating: book.averageRating,
        bookId: book._id
      }));

      console.log("ok");*/

      const averages = books.sort((a, b) => b.averageRating - a.averageRating);

      console.log(averages);

      console.log("Best book = ", averages[0]);
      console.log("Best book = ", averages[0].bookId);
      console.log("Deuxième best book =", averages[1]);
      console.log("Troisième best book =", averages[2]);

      res.status(200).json(averages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};