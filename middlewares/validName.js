function validName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "O campo \"name\" é obrigatório"});
  }
  next();
}

function validNameLength(req, res, next) {
  const { name } = req.body;
  if ( name < 3) {
    res.status(400).json({ message: "O \"name\" deve ter pelo menos 3 caracteres"})
  }
  next();
}

module.exports = {
  validName,
  validNameLength,
}
