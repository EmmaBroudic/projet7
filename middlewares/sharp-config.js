/* Ce bloc de code permet de redimensionner les images (green code)
à l'aide du package sharp
Il enregistre les images renommées et redimensionnées
dans le dossier images */

const multer = require('multer');
const upload = multer({ dest: 'images/' }).single('image');
const sharp = require('sharp');
const fs = require('fs');

const resizeImage = (req, res, next) => {
  if (!req.file) { // vérifie qu'un fichier a bien été téléchargé dans la requête
    return next();
  }
  // Utilisation de Sharp pour redimensionner l'image à 200x200 pixels
  sharp(req.file.path)
    .resize(200, 200)
    .toFile('images/optimized_' + req.file.filename)
    .then(() => {
      fs.unlinkSync(req.file.path); // Suppression de l'image d'origine après redimensionnement réussi
      req.file.path = 'images/optimized_' + req.file.filename; // Mise à jour du chemin du fichier redimensionné dans l'objet req.file
      next();
    })
    .catch((error) => {
      console.error(error);
      next();
    });
};

module.exports = { upload, resizeImage };