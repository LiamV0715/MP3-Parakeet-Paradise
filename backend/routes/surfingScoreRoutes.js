const express = require("express");
const router = express.Router();
const SurfScore = require("../models/SurfScore");
const passport = require("passport");

// POST /api/surf-score
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { stylePoints } = req.body;
      const userId = req.user._id;

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated." });
      }

      if (typeof stylePoints !== "number" || stylePoints < 0) {
        return res.status(400).json({ error: "Invalid style points value." });
      }

      const updatedSurfScore = await SurfScore.findOneAndUpdate(
        { user: userId },
        { $max: { stylePoints: Number(stylePoints) } },
        { new: true, upsert: true }
      );

      return res.status(201).json({
        message: "Surf score submitted successfully!",
        surfScore: {
          id: updatedSurfScore._id,
          stylePoints: updatedSurfScore.stylePoints,
          user: updatedSurfScore.user,
        },
      });
    } catch (error) {
      console.error("Error submitting surf score:", error.message, error.stack);
      return res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/surf-score
router.get("/", async (req, res) => {
  try {
    const surfScores = await SurfScore.find()
      .populate("user", "username birdColor") 
      .sort({ stylePoints: -1 }); 

    return res.status(200).json(surfScores);
  } catch (error) {
    console.error("Error fetching surf scores:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
