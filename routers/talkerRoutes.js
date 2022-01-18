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
  const fileConteiner = await readFile();
  if (!fileConteiner) return res.status(200).json([]);
  return res.status(200).json(fileConteiner);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const fileConteiner = await readFile();
  const talkerId = fileConteiner.find((elem) => elem.id === Number(id));
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
    const fileConteiner = await readFile();
    const conteudo = req.body;
    conteudo.id = fileConteiner.length + 1;
    const texto = JSON.stringify([conteudo], null, 2);
    await fs.writeFile('../talker.json', texto);
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
    const fileConteiner = await readFile();
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkerId = fileConteiner.findIndex((elem) => elem.id === Number(id));
    if (!talkerId) {
 return res.status(404)
        .json({ message: 'Pessoa palestrante não encontrada' }); 
}
    fileConteiner[talkerId] = { ...fileConteiner[talkerId], name, age, talk };
    await fs.writeFile('./talker.json', JSON.stringify(fileConteiner, null, 2));
    return res.status(200).json({ id: Number(id), name, age, talk });
  });

  router.delete('/:id',
    validToken,
    async (req, res) => {
      const { id } = req.params;
      const fileConteiner = await readFile();
      const talkerFind = fileConteiner.findIndex((p) => p.id === Number(id));
      if (!talkerFind) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
  
      const filter = fileConteiner.filter((value) => value.id !== Number(id));
  
      await fs.writeFile('./talker.json', JSON.stringify(filter, null, 2));
      return res.status(204).json({ message: 'Pessoa palestrante deletada com sucesso' });
    });

module.exports = router;
