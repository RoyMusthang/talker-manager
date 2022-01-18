const router = require('express').Router();
const fs = require('fs').promises;
const readFile = require('../helper/fileSystem');

const validToken = require('../middlewares/validToken');
const { validAge, validName } = require('../middlewares/validUser');
const {
  validTalk,
  validRate,
  validDate,
} = require('../middlewares/validTalker.js');

router.get('/', async (_req, res) => {
  const fileContainer = await readFile();
  if (!fileContainer) return res.status(200).json([]);
return res.status(200).json(fileContainer);
});

router.get('/search', validToken, async (req, res) => {
  const { q } = req.query;
  const fileContainer = await readFile();
  console.log("N.a")

  if (!q) return res.status(200).json({ message: "down pilou" });
  const filter = fileContainer.filter((value) => value.name.includes(q));
  return res.status(200).json(filter);
});

router.get('/:id', async (req, res) => {
const { id } = req.params;
const fileContainer = await readFile();
const talkerId = fileContainer.find((elem) => elem.id === Number(id));
if (!talkerId) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
} 
return res.status(200).json(talkerId);
});

router.post('/',
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  async (req, res) => {
    const fileContainer = await readFile();
    const conteudo = req.body;
    conteudo.id = fileContainer.length + 1;
    const texto = JSON.stringify([...fileContainer, conteudo], null, 2);
    await fs.writeFile('./talker.json', texto);
    return res.status(201).json(conteudo);
});

router.put('/:id',
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  async (req, res) => {
    const fileContainer = await readFile();
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerId = fileContainer.find((elem) => elem.id === Number(id));
    if (!talkerId) {
      return res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    const dereguejhonson = { id: Number(id), name, age, talk };
    await fs.writeFile('./talker.json', JSON.stringify([dereguejhonson], null, 2));
    return res.status(200).json({ id: Number(id), name, age, talk });
  });

  router.delete('/:id', validToken, async (req, res) => {
    const { id } = req.params;
    const fileContainer = await readFile();
    const talkerFind = fileContainer.find((elem) => elem.id === Number(id));
    if (!talkerFind) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const filter = fileContainer.filter((value) => value.id !== Number(id));

    await fs.writeFile('./talker.json', JSON.stringify(filter, null, 2));
    return res.status(204).json();
  });
module.exports = router;
