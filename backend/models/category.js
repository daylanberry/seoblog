const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  slug: {
    type: String,
    unique: true,
    index: true
  }
}, {
  timeStamp: true
});

module.exports = mongoose.model('Category', categorySchema);