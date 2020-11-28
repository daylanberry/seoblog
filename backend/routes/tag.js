const express = require('express');
const router = express.Router();

const { create, list, read, remove } = require('../controllers/tag');

const { runValidation } = require('../validators')
const { categoryCreateValidator } = require('../validators/category');
const { requireSignin, adminMiddleware} = require('../controllers/auth')


router.post('/tag', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)

router.get('/tags', list)
router.get('/tag/:slug', read)
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove)


module.exports = router