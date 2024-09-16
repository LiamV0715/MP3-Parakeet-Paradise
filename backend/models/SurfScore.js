const mongoose = require('mongoose');

const SurfScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true }, // Score out of 100
  createdAt: { type: Date, default: Date.now }
});

const SurfScore = mongoose.model('SurfScore', SurfScoreSchema);
module.exports = SurfScore;
