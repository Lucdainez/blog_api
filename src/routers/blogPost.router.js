const express = require('express');

const tokenValidation = require('../middlewares/tokenValidation.middleware');

const titleValidation = require('../middlewares/titleValidation.middleware');

const contentValidation = require('../middlewares/contentValidation.middleware');

const blogPostController = require('../controllers/blogPost.controller');

const router = express.Router();

router.get('/', tokenValidation, blogPostController.getPosts);

router.get('/:id', tokenValidation, blogPostController.getPostId);

router.put('/:id',
  tokenValidation, 
  titleValidation,
  contentValidation,
  blogPostController.updatePost);

module.exports = router;