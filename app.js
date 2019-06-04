const expressLayouts = require('express-ejs-layouts');
 express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
//setting express
var app = express();
const MongoDBStore = require('connect-mongodb-session')(session);


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

//Static Files
app.use(express.static('./asserts'));

const store = new MongoDBStore({
  uri: db,
  collection: 'sessions'
});

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);



// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Routes
app.use('/', require('./routes/index.js'));
app.use('/staff', require('./routes/staff.js'));
app.use('/student', require('./routes/student.js'));

//listering to port3000
app.listen(3000);


console.log('Server Started');