const express = require('express');
const generateToken = require('../GenerateToken');

const router = express.Router();

router.get('/login', (req, res) => {
  res.status(200).send('<h1>Login</h1>');
});

router.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    const token = generateToken();
    res.status(200).json({
      token,
  });
  } else {
    res.status(404).json({
      message: 'Envie um email e uma senha',
    });
  }
  res.status(200).json(req.body);
});

module.exports = router;