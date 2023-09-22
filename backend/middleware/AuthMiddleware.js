const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('Authorization');

  if (!accessToken) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  try {
    if (!accessToken.startsWith('Bearer ')) {
      throw new Error('Invalid token format');
    }

    const token = accessToken.slice(7); // Remove 'Bearer ' prefix

    const validToken = verify(token, process.env.JWT_SECRET);

    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = { validateToken };
