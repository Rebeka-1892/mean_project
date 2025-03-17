const jwt = require("jsonwebtoken");

// Middleware d'authentification avec gestion des rôles
const authMiddleware = (rolesAutorisés = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    try {
      // Vérification du token
      const decoded = jwt.verify(token, "SECRET_KEY");
      req.user = decoded; // Ajoute l'utilisateur à la requête
      
      console.log("Token décodé :", req.user); // 🔍 Vérifie s'il y a le rôle
      
      // Vérification des rôles
      if (rolesAutorisés.length && !rolesAutorisés.includes(decoded.role)) {
        return res.status(403).json({ message: "Accès interdit" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide" });
    }
  };
};

module.exports = authMiddleware;
