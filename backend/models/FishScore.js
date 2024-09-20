// models/FishScore.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for FishScore
const fishScoreSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    ref: "User",
    required: true,
    unique: true, // Ensure one score document per user
  },
  fishWeight: [{
    fishWeight: {
      type: Number,  // Each score is represented by a fish weight
      required: true,
    },
  }],
});

const FishScore = mongoose.model("FishScore", fishScoreSchema, 'fishscores');

module.exports = FishScore;
