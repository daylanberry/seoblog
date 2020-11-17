const express = require('express');
const router = express.Router();
const { time } = require('../controllers/blog');
const { signup } = require('../controllers/signup');

const { runValidation } = require('../validators')
const { userSignupValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);


module.exports = router