const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  code: {
    type: String,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  credithours: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  assignedlecturer: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Course', courseSchema);
