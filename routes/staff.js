const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const Student = require('../models/Student');
const Mark = require('../models/Mark');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/authforstaff');


//homePage
router.get('/',forwardAuthenticated, (req, res) => res.render('staff/homePage'));


// register
router.get('/register',forwardAuthenticated, (req, res) => res.render('staff/staffRegister'));

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
                  req.flash(
                    'success_msg',
                    'Staff Registered Successfully'
                  );
                  res.redirect('/staff/login');
                })
                .catch(err => console.log(err));


            }
        });
      }
    });
    

//login
router.get('/login', (req, res) => res.render('staff/staffLogin'));
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/staff/dashboard',
    failureRedirect: '/staff/login',
    failureFlash: true
  })(req, res, next);
});


//dashboard
router.get('/dashboard', (req, res) => res.render('staff/dashboard'));
//markentry
router.get('/dashboard/markentry',forwardAuthenticated, (req, res) => res.render('staff/markentry'));
router.post('/dashboard/markentry', (req, res) => {
    console.log(req.body);
const { rollnumber, english , tamil,maths,social,science } = req.body;
  let errors = [];

  if (!rollnumber || !english || !tamil || !maths || !science || !social) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (english<0||tamil<0 ||maths<0 ||science<0 ||social<0) {
    errors.push({ msg: 'Dont enter Negative Marks' });
  }

  if (english>100 ||tamil>100 ||maths>100 ||science>100 ||social>100) {
    errors.push({ msg: 'Enter Marks less Than 100' });
  }
  console.log(errors.length);
  if (errors.length >  0) {
    res.render('staff/markentry', {
      errors,
      rollnumber,
      english,
      tamil,
      maths,
      science,
      social

    });
  } else {
    Student.findOne({ rollnumber: rollnumber }).then(mark => {
        if (mark) {
          const newMark = new Mark({
            rollnumber,
            english,
            tamil,
            maths,
            science,
            social 
          });

              newMark
                .save()
                .then(mark => {
                  req.flash(
                    'success_msg',
                    'Mark of the Student is Added Successfully'
                  );
                  res.redirect('/staff/dashboard/markentry');
                })
                .catch(err => console.log(err));
        } else {
          errors.push({ msg: 'The Student is not Existing' });
          res.render('staff/markentry', {
            errors,
            rollnumber,
            english,
            tamil,
            maths,
            science, 
            social
            });
            }
        });
      }
    });
//newstudent
router.get('/dashboard/newstudent', forwardAuthenticated, (req, res) => res.render('staff/newstudent'));
router.post('/dashboard/newstudent', (req, res) => {
    console.log(req.body);
const { name, rollnumber , password } = req.body;
  let errors = [];

  if (!name || !rollnumber || !password ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 3) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  console.log(errors.length);
  if (errors.length >  0) {
    res.render('staff/newstudent', {
      errors,
      name,
      rollnumber,
      password
    });
  } else {
    Student.findOne({ rollnumber: rollnumber }).then(student => {
        if (student) {
          errors.push({ msg: 'Student with this RollNumber Already Exists' });
          res.render('staff/newstudent', {
            errors,
            name,
            rollnumber,
            password
          });
        } else {
          const newStudent = new Student({
            name,
            rollnumber,
            password
          });

              newStudent
                .save()
                .then(student => {
                  req.flash(
                    'success_msg',
                    'New Student is Added Successfully'
                  );
                  res.redirect('/staff/dashboard/newstudent');
                })
                .catch(err => console.log(err));


            }
        });
      }
    });
module.exports = router;