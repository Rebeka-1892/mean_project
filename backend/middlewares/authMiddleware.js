const jwt = require("jsonwebtoken");

// Middleware d'authentification avec gestion des rôles
const authMiddleware = (rolesAutorisés = []) => {
  return (req, res, next) => {
    // const token = req.header("Authorization");
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
      req.user = decoded;
      
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
