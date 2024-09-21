const express = require("express");
const router = express.Router();
const SurfScore = require("../models/SurfScore");
const passport = require("passport");

// POST /api/surf-score
router.post(
  "/",
  passport.authenticate("jwt", { session: false }), // Protect route with JWT
  async (req, res) => {
    try {
      const { score } = req.body; // Get fishWeight from request body
      const userId = req.user._id; // Get user ID from the JWT

      // Use findOneAndUpdate to either update or create the fish score for the user
      const updatedSurfScore = await SurfScore.findOneAndUpdate(
        { user: userId }, // Query by user ID
        { $max: { score: Number(score) } }, // Update only if the new fishWeight is larger
        { new: true, upsert: true } // Upsert will create a new score if one doesn't exist
      );

      return res.status(201).json({
        message: "Surf score submitted successfully!",
        surfScore: updatedSurfScore, // Return the updated or newly created score
      });
    } catch (error) {
      console.error("Error submitting surf score:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;
