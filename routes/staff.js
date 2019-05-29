const express = require('express');
const router = express.Router();

//homePage
router.get('/', (req, res) => res.render('staff/homePage'));
// register
router.get('/register', (req, res) => res.render('staff/staffRegister'));
//signin
router.get('/login', (req, res) => res.render('staff/staffLogin'));
//dashboard
router.get('/dashboard', (req, res) => res.render('staff/dashboard'));
//markentry
router.get('/markentry', (req, res) => res.send('welcome markentry'));
//newstudent
router.get('/newstudent', (req, res) => res.send('welcome newstudentregister'));
module.exports = router;