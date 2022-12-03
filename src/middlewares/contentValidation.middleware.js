module.exports = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }  
  return next();
};  