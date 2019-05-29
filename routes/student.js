const express = require('express');
const router = express.Router();

//homePage
router.get('/', (req, res) => res.render('student/homePage'));
//signin
router.get('/login', (req, res) => res.render('student/studentLogin'));
//dashboard
router.get('/dashboard', (req, res) => res.render('student/dashboard'));
module.exports = router;