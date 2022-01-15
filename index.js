const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const {
  loginAuthentication,
  generateToken,
} = require('./middlewares/loginAuthentication.js');
const {
  findToken,
  validToken,
} = require('./middlewares/validToken.js');

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
  res.status(200).send(fileConteiner);
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
  res.status(200).json(talkerId);
});

app.post('/login', loginAuthentication, (req, res) => {
  req.header = {...req.header, "authorization": TOKEN}
  res.status(200).json({ token: TOKEN });
});

app.post('/talker', findToken, validToken, async (req, res) => {
  const write = await fs.writeFile('./token.json', TOKEN)
  res.status(200).json({ message: 'Usuario adicionado!'})
})

app.listen(PORT, () => {
  console.log('Online');
});
