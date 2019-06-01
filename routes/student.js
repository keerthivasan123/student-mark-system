const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forwardAuthenticated } = require('../config/authforstudent');
//homePage
router.get('/', forwardAuthenticated , (req, res) => res.render('student/homePage'));
//signin
router.get('/login', forwardAuthenticated, (req, res) => res.render('student/studentLogin'));
//dashboard
router.get('/dashboard', (req, res) => res.render('student/dashboard'));
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/student/dashboard',
      failureRedirect: '/student/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;