const express = require('express');
const router = express.Router();


//signin
router.get('/login', (req, res) => res.send('welcome sigin'));
//dashboard
router.get('/dashboard', (req, res) => res.send('welcome dashboard'));
module.exports = router;