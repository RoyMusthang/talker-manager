const router = require('express').Router();
const fs = require('fs').promises;
const { readFile } = require('../helper/fileSystem');

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

app.get('/talker', async (_req, res) => {
  const fileConteiner = await readFile()
  if (!fileConteiner) return res.status(200).send(arrayNull);
  return res.status(200).send(fileConteiner);
});
const {
  loginAuthentication,
  generateToken,
} = require('./middlewares/loginAuthentication.js');


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


app.post('/talker',
  validToken,
  validName,
  validAgeUser,
  validAgeNotNull,
  validTalk,
  validDate,
  validRate,
  async (req, res) => {
    const talk = await fs.readFile('./talker.json', 'utf8');
    const talkerJson = await JSON.parse(talk)
    const conteudo = req.body;
    conteudo.id = talkerJson.length + 1;
    const texto = JSON.stringify([conteudo], null, 2);
    await fs.writeFile('./talker.json', texto);
    return res.status(201).json(conteudo);
});

app.put('/talker/:id',
  validToken,
  validName,
  validAgeUser,
  validAgeNotNull,
  validTalk,
  validDate,
  validRate,
  async (req, res) => {
    const fileConteiner = fs.readFile('./talker.json', 'utf8')
      .then((e) => JSON.parse(e));
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerId = fileConteiner.findIndex((elem) => elem.id === Number(id));
    if (!talkerId) return res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    fileConteiner[talkId] = { ...fileConteiner[talkerId], name, age, talk };
    fs.writeFile('./talker.json', JSON.stringify(fileConteiner));
    return res.status(200).json(fileConteiner);
  });

