// Import dependencies
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; // Use JWT_SECRET from .env

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: "User not found by passport" }); 
        })
        .catch((err) => {
          console.error(err);
          return done(err, false); // Pass the error to the next handler
        });
    })
  );
};
