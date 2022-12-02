const express = require('express');

const displayNameValidation = require('../middlewares/displayNameValidation.middleware');
const emailValidation = require('../middlewares/emailValidation.middleware');
const passwordValidation = require('../middlewares/passwordValidation.middleware');
const tokenValidation = require('../middlewares/tokenValidation.middleware');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/',
  displayNameValidation,
  emailValidation,
  passwordValidation,
  userController.insertUser);

router.get('/', tokenValidation, userController.getAllUsers);

router.get('/:id', tokenValidation, userController.getUser);

module.exports = router;