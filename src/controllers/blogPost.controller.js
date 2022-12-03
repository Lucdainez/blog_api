const blogPostService = require('../services/blogPost.service');

const getPosts = async (_req, res) => {
  const value = await blogPostService.getPosts();
  return res.status(200).json(value);
};

module.exports = {
  getPosts,
};