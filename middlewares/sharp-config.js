/* Ce bloc de code permet de redimensionner les images (green code)
à l'aide du package sharp
Il enregistre les images renommées et redimensionnées
dans le dossier images */

const multer = require('multer');
const upload = multer({ dest: 'images/' }).single('image');
const sharp = require('sharp');
const fs = require('fs');

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  sharp(req.file.path)
    .resize(370, 600)
    .toFile('images/optimized_' + req.file.filename)
    .then(() => {
      // Suppression de l'image d'origine après redimensionnement réussi
      fs.unlinkSync(req.file.path);
      // Mise à jour du chemin du fichier redimensionné dans l'objet req.file
      req.file.path = 'images/optimized_' + req.file.filename;
      next();
    })
    .catch((error) => {
      console.error(error);
      next();
    });
};

module.exports = { upload, resizeImage };