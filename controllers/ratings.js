/*Ce bloc de code comprend la fonction qui 
permettra à l'usager de noter un livre qu'il
n'a pas ajouté lui-même dans la base de données.
Une fois que cette notation est enregistrée dans
la base, la moyenne est calculée.
*/

const Book = require('../models/Book');

// Fonction de notation et calcul de la moyenne obtenue par l'objet livre
exports.rateBook = (req, res, next) => {
  const newRating = {
    userId: req.auth.userId, // identifiant utilisateur pour ne pas que l'objet soit noté deux fois par la même personne
    grade: req.body.rating,
  };

  Book.findOne({ _id: req.params.id })
    .then(book => { // ajout de la notation
      book.ratings.push(newRating);
      return book.save();
    })
    .then(savedBook => { // calcul de la moyenne
      const ratings = savedBook.ratings;

      let total = 0;
      for (let i = 0; i < ratings.length; i++) {
        total += ratings[i].grade;
      }

      const averageRating = (total / ratings.length).toFixed(2);
      savedBook.averageRating = averageRating;
      return savedBook.save();
    })
    .then(() => {
      res.status(201).json({ message: 'Rating enregistré !' });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};