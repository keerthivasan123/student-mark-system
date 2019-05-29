const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  rollnumber: {
    type: Number,
    required: true
  },
  English: {
    type: Number,
    required: true
  },
  Tamil: {
    type: Number,
    required: true
  },
  Maths: {
    type: Number,
    required: true
  },
  Science: {
    type: Number,
    required: true
  },
  Social: {
    type: Number,
    required: true
  }
});

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;
