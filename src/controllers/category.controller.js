const categoryService = require('../services/category.service');

const insertCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryService.insertCategory(name);
  return res.status(201).json(newCategory);
};

module.exports = { insertCategory };