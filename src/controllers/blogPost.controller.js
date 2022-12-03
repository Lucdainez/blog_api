const blogPostService = require('../services/blogPost.service');

const getPosts = async (_req, res) => {
  const value = await blogPostService.getPosts();
  return res.status(200).json(value);
};

const getPostId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostService.getPostId(id);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  getPosts,
  getPostId,
};