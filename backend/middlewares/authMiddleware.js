const jwt = require("jsonwebtoken");

// Middleware d'authentification avec gestion des rôles
const authMiddleware = (rolesAutorises = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Veuillez vous connecter.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      if (rolesAutorises.length && !rolesAutorises.includes(decoded.role)) {
        return res.status(403).json({ message: "Accès interdit" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Token invalide" });
    }
  };
};

module.exports = authMiddleware;