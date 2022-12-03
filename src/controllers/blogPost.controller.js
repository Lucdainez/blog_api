const blogPostService = require('../services/blogPost.service');

const jwtFunctions = require('../auth/jwtFunctions');

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

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const { title, content } = req.body;
  const userId = jwtFunctions.decodeTokenGetIdUser(authorization);
  const { type, message } = await blogPostService.updatePost(id, userId, title, content);
  if (type) {
    return res.status(type).json({ message });
  }  
  return res.status(200).json(message);
};

module.exports = {
  getPosts,
  getPostId,
  updatePost,
};