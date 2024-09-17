const express = require('express');
const router = express.Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');

// import secret
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a token
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, birdColor: user.birdColor },
        JWT_SECRET,
    );
};

// Example usage in a login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ username: user.username, birdColor: user.birdColor, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error during login' });
    }
});
