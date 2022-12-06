const { BlogPost, User, Category, PostCategory, sequelize, Sequelize } = require('../models');

const { Op } = Sequelize;

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
  if (postId.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.update({ title, content }, { where: { id } });
  const { message } = await getPostId(id);
  return { type: null, message };
};

const deletePost = async (id, userId) => { 
  const postId = await BlogPost.findOne({
    where: { id },
  });
  if (postId.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id } });
  return { type: null };
};

const transactionSequelizeCreatePost = async ({ title, content, categoryIds, userId }) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create(
      { title, content, userId, updated: Date.now(), published: Date.now() },
      {
        transaction: t,
      },
    );  
    return newPost;
  });
  const { id } = result.dataValues;
  await Promise.all(categoryIds.map(async (idC) => {
    await PostCategory.create({
      postId: id,
      categoryId: idC,
    });
  }));

  return result;
};

const insertPost = async ({ title, content, categoryIds, userId }) => {
  const categoriesVerify = await Promise.all(categoryIds.map(async (id) => {
    const categories = await Category.findOne({
      where: { id },
    });
    return categories;
  }));
  if (categoriesVerify.includes(null)) {
    return { type: 400, message: 'one or more "categoryIds" not found' };
  }
  const result = await transactionSequelizeCreatePost({ title, content, categoryIds, userId });
  return { type: null, message: result };
};

const getSearch = async (q) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${q}%` },
        content: { [Op.like]: `%${q}%` },
      },
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

module.exports = {
  getPosts,
  getPostId,
  updatePost,
  deletePost,
  insertPost,
  getSearch,
};