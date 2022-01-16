function findToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  next();
}

function validToken(req, res, next) {
  const { authorization } = req.header;
  if (authorization < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
}

module.exports = {
  findToken,
  validToken,
};
