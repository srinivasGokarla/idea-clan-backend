const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prerequisites: [String]
});

module.exports = mongoose.model('Course', courseSchema);