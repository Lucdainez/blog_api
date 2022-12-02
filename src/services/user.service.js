const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const insertUser = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return { type: 409, message: 'User already registered' };
  }
  const newUser = await User.create({ displayName, email, password, image });
  const { password: _, ...userWithoutPassword } = newUser.dataValues;
  const token = createToken(userWithoutPassword);
  return { type: 201, message: token };
};

module.exports = {
  insertUser,
};