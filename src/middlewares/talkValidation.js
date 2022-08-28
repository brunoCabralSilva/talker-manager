const validaWatchedAll = (req, res) => {
  if (!req.body.talk.watchedAt || req.body.talk.watchedAt === '') {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
};

const validaTypeOf = (rate, res) => {
  if (rate % 1 !== 0 || rate > 5 || rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
};

const talkValidation = (req, res, next) => {
  if (!req.body.talk || req.body.talk === '') {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  validaWatchedAll(req, res);
  if (!req.body.talk.rate || req.body.talk.rate === '') {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  validaTypeOf(req.body.talk.rate, res);
  next();
};
  
module.exports = talkValidation;