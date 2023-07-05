/* Ce bloc de code configure le middleware Multer pour gérer
le téléchargement et le stockage des fichiers d'images
*/

const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Répertoire de destination pour les fichiers d'images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    }, // Mise en forme du nom du fichier qui sera conservé
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');