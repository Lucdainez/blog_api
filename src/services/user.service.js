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

const getAllUsers = async () => {
  const users = await User.findAll();
  const usersWithoutPassword = users.map((user) => { 
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  });
  return usersWithoutPassword;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return { type: 404, message: 'User does not exist' };
  }
  const { password: _, ...userWithoutPassword } = user.dataValues;
  return { type: null, message: userWithoutPassword };
};

const deleteMyUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  insertUser,
  getAllUsers,
  getUserById,
  deleteMyUser,
};