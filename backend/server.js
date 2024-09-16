//DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const scoreboardRoutes = require('./routes/scoreboardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware to parse JSON requests
app.use(express.json());

// Use the scoreboard routes
app.use('/api/scoreboard', scoreboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

