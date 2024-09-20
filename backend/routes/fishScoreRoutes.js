// routes/fishScoreRoutes.js
const express = require("express");
const router = express.Router();
const FishScore = require("../models/FishScore");
const passport = require("passport");

// POST /api/fish-score - Adds a fish score for the logged-in user
router.post(
  "/", // Change this to root
  passport.authenticate("jwt", { session: false }), // Protect route with JWT
  async (req, res) => {
    try {
      const { fishWeight } = req.body;
      const userId = req.user._id; // Get user ID from the JWT

      // Find the user's fish scores or create a new one
      let fishScore = await FishScore.findOne({ user: userId });

      if (!fishScore) {
        // If no fishScore record exists for the user, create a new one
        fishScore = new FishScore({
          user: userId,
          fishscores: [fishWeight],
        });
      } else {
        // If fishScore record exists, push the new score to the array
        fishScore.scores.push(fishWeight);
      }

      // Save the updated or new fishScore document
      await fishScore.save();

      return res.status(201).json({
        message: "Fish score submitted successfully!",
        fishScore,
      });
    } catch (error) {
      console.error("Error submitting fish score:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
