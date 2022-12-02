const loginService = require('../services/login.service');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService.findUser(email, password);
  if (type === 400) return res.status(type).json({ message });
  return res.status(type).json({ token: message });
};

module.exports = {
  loginUser,
};