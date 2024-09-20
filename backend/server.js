require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/authRoutes'); 
const passport = require('passport');
require('./config/passport')(passport);
const fishingScoreRoutes = require("./routes/fishScoreRoutes");
const surfingScoreRoutes = require("./routes/surfingScoreRoutes");
const bcrypt = require('bcryptjs'); 

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json()); // For parsing application/json
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes); // Handles authentication routes
// app.use("/users", userRoutes); // Handles user-related routes (currently not favored method)
app.use("/api/fish-score", fishingScoreRoutes); // Handles fishing score routes
app.use("/scores/surfing", surfingScoreRoutes); // Handles surfing score routes


// Connect to MongoDB
console.log("MongoDB URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
