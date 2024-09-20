const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FishScoreSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  fishWeight: { type: Number, required: true }, // This should be a Number
});


module.exports = mongoose.model("FishScore", FishScoreSchema);


// const FishScore = mongoose.model("FishScore", fishScoreSchema, 'fishscores');

// module.exports = FishScore;
