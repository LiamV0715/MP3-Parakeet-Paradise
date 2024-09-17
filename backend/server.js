require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const scoreRoutes = require('./routes/scoreboardRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/auth', authRoutes); // Handles authentication routes
app.use('/users', userRoutes); // Handles user-related routes
app.use('/scores', scoreRoutes); // Handles score-related routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost/parakeets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
