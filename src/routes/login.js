const express = require('express');
const generateToken = require('../GenerateToken');
const emailV = require('../middlewares/emailValidation');
const passwordV = require('../middlewares/PasswordValidation');

const router = express.Router();

router.post('/', emailV, passwordV, (req, res) => {
  const token = generateToken();
  return res.status(200).json({
    token,
  });
});

module.exports = router;