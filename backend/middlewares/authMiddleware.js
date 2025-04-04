const jwt = require("jsonwebtoken");

// Middleware d'authentification avec gestion des rôles
const authMiddleware = (rolesAutorises = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      res.setHeader('X-Redirect', '/sign-in');
      return res.status(200).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('token decoded', decoded);
      req.user = decoded;
      
      if (rolesAutorises.length && !rolesAutorises.includes(decoded.role)) {
        res.setHeader('X-Redirect', '/unauthorized');
        return res.status(200).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      res.setHeader('X-Redirect', '/sign-in');
      return res.status(200).json({ message: 'Invalid Token' });
    }
  };
};

module.exports = authMiddleware;