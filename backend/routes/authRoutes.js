const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); 
const authController = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

// Import secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, birdColor: user.birdColor },
    JWT_SECRET
  );
};

//REGISTER NEW USER
router.post("/signup", async (req, res) => {
  const { username, password, birdColor } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, birdColor });

    console.log("User to be saved:", newUser); // Log the user object
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser); // Log the saved user

    const token = generateToken(newUser);
    res
      .status(201)
      .json({ message: "Signup successful", user: savedUser, token });
  } catch (err) {
    console.error("Error during signup:", err);
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
      return res.status(401).json({ message: "Invalid User" });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
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

// Get user information
router.get("/me", authenticate, authController.getMe);

module.exports = router;
