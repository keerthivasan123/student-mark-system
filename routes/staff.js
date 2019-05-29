const express = require('express');
const router = express.Router();

// register
router.get('/register', (req, res) => res.send('welcome register'));
//signin
router.get('/login', (req, res) => res.send('welcome sigin'));
//dashboard
router.get('/dashboard', (req, res) => res.send('welcome dashboard'));
//markentry
router.get('/markentry', (req, res) => res.send('welcome markentry'));
//newstudent
router.get('/newstudent', (req, res) => res.send('welcome newstudentregister'));
module.exports = router;