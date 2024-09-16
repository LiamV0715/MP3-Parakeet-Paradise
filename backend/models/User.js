const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  bird_color: { type: String, enum: ['blue', 'green', 'pink', 'yellow'], default: 'blue' },
  max_surf_score: { type: Number, default: 0 },
  max_fish_score: { type: Number, default: 0 }, // Fish score out of 20
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
