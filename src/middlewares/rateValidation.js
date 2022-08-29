const validaTypeOf = (rate) => {
  if (typeof rate !== 'number' || rate > 5 || rate < 1) {
    return true;
  } return false;
};

const rateValidation = (req, res, next) => {
  if (!req.body.talk.rate || req.body.talk.rate === '') {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (validaTypeOf(req.body.talk.rate)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = rateValidation;