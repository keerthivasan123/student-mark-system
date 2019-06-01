const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load User model
const Staff = require('../models/Staff');
console.log('passport.js');
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ email: 'email' }, (email, password, done) => {
      // Match user
      Staff.findOne({
        email: email
      }).then(staff => {
        if (!staff) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        var isMatch = password.localeCompare(staff.password);
        console.log(isMatch);
          if (isMatch == 0) {
            return done(null, staff);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
      });
    })
  );
 

  passport.serializeUser(function(staff, done) {
    done(null, staff.id);
  });

  passport.deserializeUser(function(id, done) {
    Staff.findById(id, function(err, staff) {
      done(err, staff);
    });
  });
};
