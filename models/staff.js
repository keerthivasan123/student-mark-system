const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  school:{
      type: String,
      required: true
  }
});

const Staff = mongoose.model('Staff', StaffSchema);

module.exports = Staff;
