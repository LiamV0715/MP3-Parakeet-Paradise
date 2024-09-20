const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// Get cumulative scores
router.get('/cumulative', async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          username: 1,
          bird_color: 1,
          total_score: { $add: ['$max_surf_score', { $multiply: ['$max_fish_score', 5] }] }, // Scaling fish score to match surfing
        },
      },
      { $sort: { total_score: -1 } },
    ]);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error getting cumulative');
  }
});

// Get biggest fish scores
router.get('/biggestFish', async (req, res) => {
  try {
    const users = await User.find().sort({ max_fish_score: -1 }).select('username bird_color max_fish_score');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error getting biggest fish');
  }
});

// Get best shred (surfing) scores
router.get('/bestShred', async (req, res) => {
  try {
    const users = await User.find().sort({ max_surf_score: -1 }).select('username bird_color max_surf_score');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error getting best shred');
  }
});

module.exports = router;
