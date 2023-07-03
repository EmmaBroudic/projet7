const Thing = require('../models/Thing');
const Rating = Thing.model('Thing').schema.path('ratings').schema; // Importez le modèle Thing correspondant

exports.rateBook = (req, res, next) => {
console.log(req.body);
  const ratingObject = req.body;
  console.log(ratingObject);
  /*delete ratingObject._id;
  delete ratingObject._userId;*/

  // Récupérer le modèle Rating
  /*const Rating = Thing.schema.path('ratings').schema;*/

  const newRating = new Rating({
    userId: req.body.userId,
    rating: req.body.rating,
  });

  
  // Trouver le Thing associé à l'ID et ajouter le nouveau rating
  Thing.findById(req.params.id)
    .then(thing => {
      if (!thing) {
        throw new Error('Objet non trouvé');
      }

      thing.ratings.push(newRating); // Ajouter le nouveau rating à la liste des ratings
      return thing.save(); // Sauvegarder les modifications
    })
    .then(() => res.status(201).json({ message: 'Rating ajouté' }))
    .catch(error => { res.status(400).json({ error }) });
};