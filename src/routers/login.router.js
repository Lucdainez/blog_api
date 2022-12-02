const express = require('express');

const fieldsMissingValidation = require('../middlewares/fieldsMissingLoginValidation.middleware');

const loginController = require('../controllers/login.controller');

const router = express.Router();

router.post('/', fieldsMissingValidation, loginController.loginUser);

module.exports = router;