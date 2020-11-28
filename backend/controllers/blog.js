const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag')

const { smartTrim } = require('../helpers/blog');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const fs = require('fs')


exports.create = (req, res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if (err) {
      return res.status(400).json({
        error: 'Image could not upload'
      })
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'title is required'
      })
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: 'Content is too short'
      })
    }

    if (!categories || !categories.length) {
      return res.status(400).json({
        error: 'Atleast one category is required'
      })
    }

    if (!tags || !tags.length) {
      return res.status(400).json({
        error: 'Atleast one tag is required'
      })
    }


    let blog = new Blog()

    blog.title = title
    blog.slug = slugify(title).toLowerCase()
    blog.excerpt = smartTrim(body, 320, ' ', ' ...');
    blog.body = body
    blog.mTitle = `${title} | ${process.env.APP_NAME}`
    blog.mDesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.user._id

    let arrayOfCategories = categories && categories.split(',')
    let arrayOfTags = tags && tags.split(',')

    console.log(arrayOfCategories, arrayOfTags)


    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }

      blog.photo.data = fs.readFileSync(files.photo.path)
      blog.photo.contentType = files.photo.type
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }

      // res.json(result)
      Blog.findByIdAndUpdate(result._id, { $push: {categories: arrayOfCategories} }, { new: true })
        .exec((err, result) => {

          // console.log('errr', err)

          if (err) {
            return res.status(400).json({
              error: errorHandler(err)
            })
          } else {

            Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true })
              .exec((err, result) => {

                if (err) {
                  return res.status(400).json({
                    error: errorHandler(err)
                  })
                } else {

                  return res.json(result)
                }
              })
          }
      })

    })

  })

}

