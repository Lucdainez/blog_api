module.exports = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  return next();
};