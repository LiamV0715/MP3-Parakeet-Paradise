const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Import secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, birdColor: user.birdColor },
    JWT_SECRET
  );
};

// User registration
router.post("/signup", async (req, res) => {
  const { username, password, birdColor } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, birdColor });
    await newUser.save();

    // Generate a JWT token
    const token = generateToken(newUser);

    res
      .status(201)
      .json({ message: "Signup successful", user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken(user);

    res
      .status(200)
      .json({ username: user.username, birdColor: user.birdColor, token });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
