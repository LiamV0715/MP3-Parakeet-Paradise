const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurfScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stylePoints: { type: Number, required: true },
});

module.exports = mongoose.model("SurfScore", SurfScoreSchema);
