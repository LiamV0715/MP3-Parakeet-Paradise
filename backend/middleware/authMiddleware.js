// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;

// const authenticate = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded; // Attach the decoded user (with id and username) to req.user
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authenticate;
