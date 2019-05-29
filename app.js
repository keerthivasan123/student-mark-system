const expressLayouts = require('express-ejs-layouts');
var express = require('express');
const mongoose = require('mongoose');
//setting express
var app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  
//middleware on  static files
app.use(express.static(__dirname + '/asserts'));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/staff', require('./routes/staff.js'));
app.use('/student', require('./routes/student.js'));

//listering to port3000
app.listen(3000);


console.log('Server Started');