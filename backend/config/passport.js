const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => done(err, false));
  })
);

module.exports = passport;
