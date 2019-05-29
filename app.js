//const mongoose = require('mongoose');
var express = require('express');
//setting express
var app = express();
//setting ejs
app.set('view engine','ejs');

// Routes
app.use('/', require('./routes/index.js'));
app.use('/staff', require('./routes/staff.js'));
app.use('/student', require('./routes/student.js'));

//listering to port3000
app.listen(3000);


console.log('Server Started');