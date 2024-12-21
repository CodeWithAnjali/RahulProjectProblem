// /middleware/authenticate.js
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env

// Middleware to authenticate and verify JWT token
const authenticate = (req, res, next) => {
  // Get token from Authorization header (Bearer <token>)
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information (e.g., userId) to the request object
    req.userId = decodedToken.userId;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

module.exports = authenticate;
