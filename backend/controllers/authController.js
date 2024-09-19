const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const secret = process.env.JWT_SECRET; 

// User registration
exports.register = async (req, res) => {
  const { username, password, birdColor } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      username,
      password: hashedPassword,
      birdColor,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

    res.status(201).json({ token, username: user.username, birdColor: user.birdColor });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });

    res.status(200).json({ token, username: user.username, birdColor: user.birdColor });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


// Get user information using JWT token payload only
exports.getMe = async (req, res) => {
  try {
    // Extract user data from JWT payload
    const { username, birdColor } = req.user.username; // Ensure req.user exists and contains necessary data
    
    if (!username || !birdColor) {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    // Respond with the user data directly from the JWT token
    res.json({ username, birdColor });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};


