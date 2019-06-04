const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
//homePage
router.get('/', (req, res) => res.render('student/homePage'));
//signin
router.get('/login', (req, res) => res.render('student/studentLogin',{
  isAuthenticated: false,
  
}));
//dashboard
router.get('/dashboard', (req, res) => res.render('student/dashboard',{
  isAuthenticated: req.session.isLoggedIn,
  name : req.param.rollnumber
})

);
// Login
router.post('/login', (req, res, next) => {
  const rollnumber = req.body.rollnumber;
  const password = req.body.password;
  Student.findOne({ rollnumber: rollnumber })
    .then(user => {
      if (!user) {
        return res.redirect('login/');
      }
      var isMatch = password.localeCompare(user.password);
      //console.log(isMatch);
      //console.log(user.password);
      if (isMatch==0) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('dashboard/');
        });
        
      }
      res.redirect('login/');
      
  });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;