const userService = require('../services/user.service');

const insertUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await userService.insertUser(displayName, email, password, image);
  if (type === 409) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token: message });
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getUserById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  insertUser,
  getAllUsers,
  getUser,
};