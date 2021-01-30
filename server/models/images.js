const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImagesSchema = new Schema({
  boardId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  tags: [String],
  date: {
    type: String,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Images', ImagesSchema);
