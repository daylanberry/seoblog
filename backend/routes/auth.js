const express = require('express');
const router = express.Router();
const { time } = require('../controllers/blog');
const { signup } = require('../controllers/auth');

const { runValidation } = require('../validators')
const { userSignupValidator, userSigninValidator } = require('../validators/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/sigin', userSigninValidator, runValidation, signup);


module.exports = router