const mongoose = require('mongoose');

const FishScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fish_weight: { type: Number, required: true }, // Score out of 20
  createdAt: { type: Date, default: Date.now }
});

const FishScore = mongoose.model('FishScore', FishScoreSchema);
module.exports = FishScore;
