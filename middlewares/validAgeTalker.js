function validAgeUser(req, res, next) {
  const { age } = req.body;
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

  function validAgeNotNull(req, res, next) {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  next();
}

module.exports = {
  validAgeUser,
  validAgeNotNull,
};
