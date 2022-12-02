const userService = require('../services/user.service');

const insertUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { type, message } = await userService.insertUser(displayName, email, password, image);
  if (type === 409) {
    return res.status(type).json({ message });
  }
  return res.status(type).json({ token: message });
};

module.exports = {
  insertUser,
};