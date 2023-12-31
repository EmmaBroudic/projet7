/* Ce bloc de code comprend les fonctions qui permettent
de créer, récupérer, modifier, supprimer les objets livres */

const Book = require('../models/Book');

// Importation du module fs (file system) pour gérer les fichiers
const fs = require('fs');

// fonction de création d'un nouvel objet livre
exports.createBook = (req, res, next) => {

  const { book } = req.body;
  const bookObject = JSON.parse(book);
  /*delete bookObject._id;*/
  delete bookObject._userId;
  
  const data = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/optimized_${req.file.filename}`,
  });

  data.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

// fonction de récupération d'un objet livre précis
exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id
  })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

// fonction de modification d'un objet livre
exports.modifyBook = (req, res, next) => {
  const { book } = req.body;
  const bookObject = req.file ? {
      ...JSON.parse(book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/optimized_${req.file.filename}`
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

// fonction supprimer un objet livre
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

// fonction de récupération de l'intégralité des objets livres
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

// fonction de récupération des trois meilleurs livres
exports.getBestBooks = (req, res, next) => {
  Book.find()

    .then((books) => {
      const averages = books.sort((a, b) => b.averageRating - a.averageRating);

      const bestBooks = [averages[0], averages[1], averages[2]];

      res.status(200).json(bestBooks);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};