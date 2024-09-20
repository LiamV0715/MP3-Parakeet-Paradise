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



module.exports = {
  createUser,
};
