const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('Boards', BoardsSchema);
