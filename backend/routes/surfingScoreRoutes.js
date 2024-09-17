const express = require('express');
const router = express.Router();
const SurfingScore = require('../models/SurfScore'); 

// Get all surfing scores
router.get('/', async (req, res) => {
    try {
        const scores = await SurfingScore.find();
        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get scores for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const scores = await SurfingScore.find({ userId });
        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new surfing score
router.post('/', async (req, res) => {
    const { userId, score } = req.body;
    try {
        const newScore = new SurfingScore({ userId, score });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
