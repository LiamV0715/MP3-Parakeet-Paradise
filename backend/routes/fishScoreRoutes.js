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

      // Use findOneAndUpdate to either update or create the fish score for the user
      const updatedFishScore = await FishScore.findOneAndUpdate(
        { user: userId }, // Query by user ID
        { $max: { fishWeight: Number(fishWeight) } }, // Update only if the new fishWeight is larger
        { new: true, upsert: true } // Upsert will create a new score if one doesn't exist
      );

      return res.status(201).json({
        message: "Fish score submitted successfully!",
        fishScore: updatedFishScore, // Return the updated or newly created score
      });
    } catch (error) {
      console.error("Error submitting fish score:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/fish-score
router.get("/", async (req, res) => {
  try {
    // Fetch all fish scores, sorted by fishWeight in descending order
    const fishScores = await FishScore.find()
      .populate("user", "username birdColor") // Assuming FishScore model references the User model
      .sort({ fishWeight: -1 }); // Sort by fishWeight, descending

    return res.status(200).json(fishScores);
  } catch (error) {
    console.error("Error fetching fish scores:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
