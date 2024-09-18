const mongoose = require('mongoose');

const FishScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fish_weight: { type: Number, required: true }, 
});

const FishScore = mongoose.model('FishScore', FishScoreSchema);
module.exports = FishScore;
