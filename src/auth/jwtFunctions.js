const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSecretAqui';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (userWithoutPassword) => jwt
  .sign({ data: userWithoutPassword }, secret, jwtConfig);

module.exports = {
  createToken,
};