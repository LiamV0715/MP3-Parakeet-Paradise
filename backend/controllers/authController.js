const User = require('../models/User'); // Assuming you have a User model defined
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Environment variables for JWT secret
const jwtSecret = process.env.JWT_SECRET;
const tokenExpiration = '1h'; // Token expiration time

// Register a new user (Sign Up)
const registerUser = async (req, res) => {
  const { username, password, birdColor } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      birdColor,
    });

    // Save the new user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, jwtSecret, { expiresIn: tokenExpiration });

    // Respond with the token and user info
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        birdColor: newUser.birdColor,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: tokenExpiration });

    // Respond with the token and user info
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        birdColor: user.birdColor,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user info (Protected Route Example)
const getUserProfile = async (req, res) => {
  try {
    // req.user is populated by the authMiddleware after decoding the JWT
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      birdColor: user.birdColor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
