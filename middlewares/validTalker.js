const regexDate = /\d.\/\d.\/\d./;
const listRate = [1, 2, 3, 4, 5];
const testBuniutu = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

// regex com auxilio de rogerim do ingá

function validTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json(testBuniutu);
  }
  next();
}

function validDate(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
      res.status(400).json(testBuniutu);
  }
  if (!regexDate.test(watchedAt)) {
    res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
}

function validRate(req, res, next) {
  const { talk: { rate } } = req.body;
  if (!rate) {
    res.status(400).json(testBuniutu);
  }
  if (!(rate in listRate)) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = {
  validTalk,
  validDate,
  validRate,
};
