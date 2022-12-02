const { User } = require('../models');
const { createToken } = require('../auth/jwtFunctions');

const findUser = async (email, password) => {
  const [user] = await User.findAll({ where: { email, password } });
  if (!user) {
    return { type: 400, message: 'Invalid fields' };
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { type: 200, message: token };
};

module.exports = {
  findUser,
};