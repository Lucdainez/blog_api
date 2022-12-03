const express = require('express');

const tokenValidation = require('../middlewares/tokenValidation.middleware');

const blogPostController = require('../controllers/blogPost.controller');

const router = express.Router();

router.get('/', tokenValidation, blogPostController.getPosts);

module.exports = router;