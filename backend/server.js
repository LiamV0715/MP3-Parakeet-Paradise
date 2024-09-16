const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://localhost/parakeets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes); // Handles user-related routes
app.use('/api/scores', scoreRoutes); // Handles score-related routes
app.use('/api/auth', authRoutes); // Handles authentication routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Middleware to parse JSON requests
app.use(express.json());

// Use the scoreboard routes
app.use('/routes/scoreboardRoutes', scoreboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

