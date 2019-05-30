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
router.get('/dashboard/markentry', (req, res) => res.render('staff/markentry'));
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
router.get('/dashboard/newstudent', (req, res) => res.render('staff/newstudent'));
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
                  res.redirect('/staff/dashboard/newstudent');
                })
                .catch(err => console.log(err));


            }
        });
      }
    });
module.exports = router;