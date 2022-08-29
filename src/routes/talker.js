const express = require('express');
const fs = require('fs').promises;
const nameV = require('../middlewares/nameValidation');
const ageV = require('../middlewares/ageValidation');
const talkV = require('../middlewares/talkValidation');
const tokenV = require('../middlewares/tokenValidation');
const rateV = require('../middlewares/rateValidation');
const watchV = require('../middlewares/watchedAtValidation');

const router = express.Router();
const endereçoJson = 'src/talker.json';

router.get('/', async (req, res) => {
  const talkerJson = await fs.readFile(endereçoJson, 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  if (talkerConverted.length > 0) {
    return res.status(200).json(talkerConverted);
  } return res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const talkerJson = await fs.readFile(endereçoJson, 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  const { id } = req.params;
  const idFounded = talkerConverted.find((item) => item.id === Number(id));
  if (idFounded === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
    return res.status(200).json(idFounded);
});

router.post('/', tokenV, nameV, ageV, talkV, rateV, watchV, async (req, res) => {
  const talker = await fs.readFile(endereçoJson, 'utf-8');
  const talkerJson = await JSON.parse(talker);
  const item = {
    id: talkerJson.length + 1,
    name: req.body.name,
    age: req.body.age,
    talk: {
      watchedAt: req.body.talk.watchedAt,
      rate: req.body.talk.rate,
    },
  };
  
  talkerJson.push(item);
  await fs.writeFile(endereçoJson, JSON.stringify(talkerJson));
  
  return res.status(201).json(item);
});

router.put('/:id', tokenV, nameV, ageV, talkV, rateV, watchV, async (req, res) => {
  const talker = await fs.readFile(endereçoJson, 'utf-8');
  const talkerJson = await JSON.parse(talker);
  const id = parseInt(req.params.id, 10);
  const removeItem = talkerJson.filter((tk) => tk.id !== id);
  let novoObjs = [];
  if (!req.body.id) {
    const objs = {
      ...req.body,
      id,
    };
    novoObjs = [objs, ...removeItem];
  } else {
    novoObjs = [req.body, ...removeItem];
  }
  await fs.writeFile(endereçoJson, JSON.stringify(novoObjs));
  return res.status(200).json({ id, ...req.body });
});

router.delete('/:id', tokenV, async (req, res) => {
  const talker = await fs.readFile(endereçoJson, 'utf-8');
  const talkerJson = await JSON.parse(talker);
  const id = parseInt(req.params.id, 10);
  const removeItem = talkerJson.filter((tk) => tk.id !== id);
  await fs.writeFile(endereçoJson, JSON.stringify(removeItem));
  return res.status(204).json();
});

module.exports = router;