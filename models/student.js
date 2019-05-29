const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollnumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Student = mongoose.model('User', StudentSchema);

module.exports = Student;
