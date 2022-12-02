const express = require('express');

const tokenValidation = require('../middlewares/tokenValidation.middleware');

const nameCategoryValidation = require('../middlewares/nameCategoryValidation');

const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.post('/', tokenValidation, nameCategoryValidation, categoryController.insertCategory);

router.get('/', tokenValidation, categoryController.getAllCategories);

module.exports = router;