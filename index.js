const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  loginAuthentication,
  generateToken,
} = require('./middlewares/loginAuthentication.js');
const validToken = require('./middlewares/validToken.js');
const validName = require('./middlewares/validName.js');
const {
  validAgeUser,
  validAgeNotNull,
} = require('./middlewares/validAgeTalker.js');
const {
  validTalk,
  validRate,
  validDate,
} = require('./middlewares/validTalker.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const arrayNull = [];
const TOKEN = generateToken();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const fileConteiner = await fs.readFile('./talker.json', 'utf8')
    .then((e) => JSON.parse(e));
  if (!fileConteiner) return res.status(200).send(arrayNull);
  return res.status(200).send(fileConteiner);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const fileConteiner = await fs.readFile('./talker.json', 'utf8')
    .then((e) => JSON.parse(e));
  const talkerId = fileConteiner.find((elem) => elem.id === Number(id));
  if (!talkerId) {
 return res.status(404)
    .json({ message: 'Pessoa palestrante não encontrada' }); 
} 
  return res.status(200).json(talkerId);
});

app.post('/login', loginAuthentication, (req, res) => {
  req.header = { ...req.header, authorization: TOKEN };
  return res.status(200).json({ token: TOKEN });
});

app.post('/talker',
  validToken,
  validName,
  validAgeUser,
  validAgeNotNull,
  validTalk,
  validDate,
  validRate,
  async (req, res) => {
    const conteudo = req.body;
    conteudo.id = 5;
    const texto = JSON.stringify([conteudo], null, 2);
    await fs.writeFile('./talker.json', texto);
    return res.status(201).json(conteudo);
});

app.put('/talker/:id', async (req, res) => {
})

app.listen(PORT, () => {
  console.log('Online');
});
