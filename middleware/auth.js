const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // middleware function
  const token = req.header('x - auth - token');

  //Check for token
  if (!token)
    return res.status(401).json({ msg: 'No  token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next(); // Calling next middleware
  } catch (e) {
    res.status(400).json({ msg: 'Token is invalid' });
  }
}

module.exports = auth;
