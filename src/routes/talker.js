const express = require('express');
const fs = require('fs').promises;
const nameV = require('../middlewares/nameValidation');
const ageV = require('../middlewares/ageValidation');
const talkV = require('../middlewares/talkValidation');
const tokenV = require('../middlewares/tokenValidation');
const rateV = require('../middlewares/rateValidation');
const watchV = require('../middlewares/watchedAtValidation');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  if (talkerConverted.length > 0) {
    return res.status(200).json(talkerConverted);
  } return res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  const { id } = req.params;
  const idFounded = talkerConverted.find((item) => item.id === Number(id));
  if (idFounded === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } 
    return res.status(200).json(idFounded);
});

router.post('/', tokenV, nameV, ageV, talkV, rateV, watchV, async (req, res) => {
  const talker = await fs.readFile('src/talker.json', 'utf-8');
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
  await fs.writeFile('src/talker.json', JSON.stringify(talkerJson));
  
  return res.status(201).json(item);
});

module.exports = router;