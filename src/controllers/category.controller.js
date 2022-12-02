const categoryService = require('../services/category.service');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryService.insertCategory(name);
  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const categories = await categoryService.getAllCategories();
  return res.status(200).json(categories);
};

module.exports = {
  insertCategory,
  getAllCategories,
};