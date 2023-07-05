/* Ce bloc de code définit un middleware pour vérifier et décoder un token JWT
dans une requête
*/

// Importation du module jsonwebtoken
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // Extraction du token du header Authorization
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décodage du token avec une clé secrète
       const userId = decodedToken.userId; // Récupération de l'identifiant de l'utilisateur à partir du token
       req.auth = {
           userId: userId // Ajout de l'identifiant de l'utilisateur à la requête pour une utilisation ultérieure
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};