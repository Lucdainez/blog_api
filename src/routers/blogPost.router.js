const express = require('express');

const tokenValidation = require('../middlewares/tokenValidation.middleware');

const titleValidation = require('../middlewares/titleValidation.middleware');

const contentValidation = require('../middlewares/contentValidation.middleware');

const blogPostController = require('../controllers/blogPost.controller');

const router = express.Router();

router.get('/', tokenValidation, blogPostController.getPosts);

router.get('/search', tokenValidation, blogPostController.getSearch);

router.get('/:id', tokenValidation, blogPostController.getPostId);

router.delete('/:id', tokenValidation, blogPostController.deletePost);

router.put('/:id',
  tokenValidation, 
  titleValidation,
  contentValidation,
  blogPostController.updatePost);

router.post('/',
  tokenValidation, 
  titleValidation,
  contentValidation,
  blogPostController.insertPost);

module.exports = router;