const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const Student = require('../models/Student');
const Mark = require('../models/Mark');


//homePage
router.get('/', (req, res) => res.render('staff/homePage'));


// register
router.get('/register', (req, res) => res.render('staff/staffRegister'));

router.post('/register', (req, res) => {
    console.log(req.body);
const { name, email, password, password2, school } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !school) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 3) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  console.log(errors.length);
  if (errors.length >  0) {
    res.render('staff/staffRegister', {
      errors,
      name,
      email,
      password,
      password2,
      school
    });
  } else {
    Staff.findOne({ email: email }).then(staff => {
        if (staff) {
          errors.push({ msg: 'Staff Email is already existsting' });
          res.render('staff/staffRegister', {
            errors,
            name,
            email,
            password,
            password2,
            school
          });
        } else {
          const newStaff = new Staff({
            name,
            email,
            password,
            school
          });

              newStaff
                .save()
                .then(staff => {
                  res.redirect('/staff/dashboard');
                })
                .catch(err => console.log(err));


            }
        });
      }
    });
    

//signin
router.get('/login', (req, res) => res.render('staff/staffLogin'));
//dashboard
router.get('/dashboard', (req, res) => res.render('staff/dashboard'));
//markentry
router.get('/markentry', (req, res) => res.send('welcome markentry'));
//newstudent
router.get('/newstudent', (req, res) => res.send('welcome newstudentregister'));
module.exports = router;