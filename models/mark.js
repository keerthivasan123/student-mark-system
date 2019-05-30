const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  rollnumber: {
    type: Number,
    required: true
  },
  english: {
    type: Number,
    required: true
  },
  tamil: {
    type: Number,
    required: true
  },
  maths: {
    type: Number,
    required: true
  },
  science: {
    type: Number,
    required: true
  },
  social: {
    type: Number,
    required: true
  }
});

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;
