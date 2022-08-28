const express = require('express');
const generateToken = require('../GenerateToken');
const emailV = require('../middlewares/emailValidation');
const passwordV = require('../middlewares/PasswordValidation');

const router = express.Router();

router.post('/login', emailV, passwordV, (req, res) => {
  const token = generateToken();
  res.status(200).json({
    token,
  });
});

module.exports = router;