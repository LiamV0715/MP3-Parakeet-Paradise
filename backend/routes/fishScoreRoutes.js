const express = require("express");
const router = express.Router();
const FishScore = require("../models/FishScore");
const passport = require("passport");

// POST /api/fish-score 
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // Protect route with JWT
  async (req, res) => {
    try {
      const { fishWeight } = req.body; // Get fishWeight from request body
      const userId = req.user._id; // Get user ID from the JWT

      // Convert fishWeight to a number and validate
      const weight = Number(fishWeight);
      if (isNaN(weight) || weight <= 0) {
        return res.status(400).json({ error: "Invalid fish weight. Must be a positive number." });
      }

      // Create a new fish score document
      const newFishScore = new FishScore({
        user: userId, // Store the user ID
        fishWeight: weight, // Store the fishWeight as a validated number
      });

      // Save the new fishScore document
      await newFishScore.save();

      return res.status(201).json({
        message: "Fish score submitted successfully!",
        fishScore: newFishScore, // Return the newly created score
      });
    } catch (error) {
      console.error("Error submitting fish score:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
