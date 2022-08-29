const express = require('express');
const fs = require('fs').promises;
const nameV = require('../middlewares/nameValidation');
const ageV = require('../middlewares/ageValidation');
const talkV = require('../middlewares/talkValidation');
const tokenV = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  if (talkerConverted.length > 0) {
    res.status(200).json(talkerConverted);
  } else res.status(200).json([]);
});

router.get('/:id', async (req, res) => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  const { id } = req.params;
  const idFounded = talkerConverted.find((item) => item.id === Number(id));
  if (idFounded === undefined) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(idFounded);
  }
});

router.post('/', tokenV, nameV, ageV, talkV, (req, res) => {
  res.status(201).json({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    talk: {
      watchedAt: req.body.talk.watchedAt,
      rate: req.body.talk.rate,
    },
  });
});

module.exports = router;