const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema;


const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    min: 3,
    max: 160,
    index: true,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  body: {
    type: {},
    required: true,
    min: 200,
    max: 2000000
  },
  excerpt: {
    type: String,
    required: true,
    max: 1000
  },
  mtitle: {
    type: String
  },
  mdesc: {
    type: String
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  categories: [
    {type: ObjectId, ref: 'Category', required: true}
  ],
  tags: [
    {type: ObjectId, ref: 'tag', required: true}
  ],
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }

}, {
  timeStamp: true
});

module.exports = mongoose.model('Blog', blogSchema);