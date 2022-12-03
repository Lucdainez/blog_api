const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'seuSecretAqui';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (userWithoutPassword) => jwt
  .sign({ data: userWithoutPassword }, secret, jwtConfig);

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return { type: null, message: payload };
  } catch (error) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

const decodeTokenGetIdUser = (authorization) => {
  const { data } = jwt.decode(authorization);
  return data.id;
};

module.exports = {
  createToken,
  verifyToken,
  decodeTokenGetIdUser,
};