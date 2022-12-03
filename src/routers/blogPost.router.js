const express = require('express');

const tokenValidation = require('../middlewares/tokenValidation.middleware');

const blogPostController = require('../controllers/blogPost.controller');

const router = express.Router();

router.get('/', tokenValidation, blogPostController.getPosts);

router.get('/:id', tokenValidation, blogPostController.getPostId);

module.exports = router;