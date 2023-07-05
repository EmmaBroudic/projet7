const multer = require('multer');
const upload = multer({ dest: 'images/' }).single('image');
const sharp = require('sharp');
const fs = require('fs');

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  sharp(req.file.path)
    .resize(20, 20)
    .toFile('images/optimized_' + req.file.filename)
    .then(() => {
      fs.unlinkSync(req.file.path);
      req.file.path = 'images/optimized_' + req.file.filename;
      next();
    })
    .catch((error) => {
      console.error(error);
      next();
    });
};

module.exports = { upload, resizeImage };