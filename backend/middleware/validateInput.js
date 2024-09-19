const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  check('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = validateSignup;
