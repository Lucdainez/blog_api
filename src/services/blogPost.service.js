const { BlogPost, User, Category } = require('../models');

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getPostId = async (id) => {
  const postId = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!postId) {
    return { type: 404, message: 'Post does not exist' };
  }
  return { type: null, message: postId };
};

const updatePost = async (id, userId, title, content) => {
  const postId = await BlogPost.findOne({
    where: { id },
  });
  if (postId.user_id !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const { message } = await getPostId(id);
  delete message.user_id;
  return { type: null, message };
};

module.exports = {
  getPosts,
  getPostId,
  updatePost,
};