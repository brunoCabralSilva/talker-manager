const express = require('express');
const fs = require('fs').promises;
const nameV = require('../middlewares/nameValidation');
const ageV = require('../middlewares/ageValidation');
const talkV = require('../middlewares/talkValidation');

const router = express.Router();

const talkerEnd = async () => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  router.get('/talker', (req, res) => {
    console.log(talkerConverted.length);
    if (talkerConverted.length > 0) {
      res.status(200).json(talkerConverted);
    } else res.status(200).json([]);
  });
};

const talkerIdEnd = async () => {
  const talkerJson = await fs.readFile('src/talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  router.get('/talker/:id', (req, res) => {
    const { id } = req.params;
    const idFounded = talkerConverted.find((item) => item.id === Number(id));
    if (idFounded === undefined) {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } else {
      res.status(200).json(idFounded);
    }
  });
};

router.post('/talker', nameV, ageV, talkV, (req, res) => {
  res.status(200).json({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    talk: {
      watchedAt: req.body.talk.watchedAt,
      rate: req.body.talk.rate,
    },
  });
});

talkerEnd();
talkerIdEnd();

module.exports = router;