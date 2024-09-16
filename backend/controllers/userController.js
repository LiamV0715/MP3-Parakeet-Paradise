const User = require('../models/User');
const SurfScore = require('../models/SurfScore');
const FishScore = require('../models/FishScore');

// Creating a new user
const createUser = async (req, res) => {
  const { username, password, birdColor } = req.body;
  
  try {
    const newUser = new User({ username, password, bird_color: birdColor });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Saving a new surf score
const saveSurfScore = async (req, res) => {
  const { userId, score } = req.body;
  
  try {
    const surfScore = new SurfScore({ user: userId, score });
    await surfScore.save();
    res.status(201).json({ message: 'Surf score saved successfully', surfScore });
  } catch (error) {
    res.status(500).json({ message: 'Error saving surf score', error });
  }
};

// Saving a new fish score
const saveFishScore = async (req, res) => {
  const { userId, fishWeight } = req.body;
  
  try {
    const fishScore = new FishScore({ user: userId, fish_weight: fishWeight });
    await fishScore.save();
    res.status(201).json({ message: 'Fish score saved successfully', fishScore });
  } catch (error) {
    res.status(500).json({ message: 'Error saving fish score', error });
  }
};

module.exports = {
  createUser,
  saveSurfScore,
  saveFishScore
};
