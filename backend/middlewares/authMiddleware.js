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
      req.user = decoded;
      console.log('Decoded token: ', decoded)
      if (rolesAutorises.length && !rolesAutorises.includes(decoded.role)) {
        res.setHeader('X-Redirect', '/unauthorized');
        return res.status(200).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      res.setHeader('X-Redirect', '/sign-in');
      return res.status(200).json({ message: `Invalid Token: ${error.message}` });
    }
  };
};

module.exports = authMiddleware;