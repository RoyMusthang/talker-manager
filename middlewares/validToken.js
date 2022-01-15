function findToken (req, res, next){
  const { token } = req.header.authorization;
  if (!token) {
    res.status(401).json({ massage: "Token não encontrado"})
  }
  next();
}

function validToken (req, res, next) {
  const { token } = req.header.authorization;
  if (token < 16) {
    res.status(401).json({ message: "Token inválido"})
  }
  next();
}

module.exports = {
  findToken,
  validToken
};
