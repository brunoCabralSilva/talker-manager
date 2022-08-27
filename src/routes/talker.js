const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

const talkerAsync = async () => {
  const talkerJson = await fs.readFile('talker.json', 'utf-8');
  const talkerConverted = await JSON.parse(talkerJson);
  router.get('/talker', (req, res) => {
    if (talkerConverted.length > 0) {
      res.status(200).json(JSON.parse(talkerConverted));
    } else {
      res.status(200).json([]);
    }
  });
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

talkerAsync();

module.exports = router;