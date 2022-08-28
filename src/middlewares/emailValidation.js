const emailValidation = (req, res, next) => {
  const validateEmail = /\S+@\S+\.\S+/;
  if (req.body.email === undefined || req.body.email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } 
  if (!validateEmail.test(req.body.email)) {
    return res.status(400).json({
    message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = emailValidation;