const validaWatchedAll = (req, res) => {
  if (!req.body.talk.watchedAt || req.body.talk.watchedAt === '') {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }
  const vWatched = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!vWatched.test(req.body.talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
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
  if (!req.body.talk.rate || req.body.talk.rate === '') {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  validaTypeOf(req.body.talk.rate, res);
  validaWatchedAll(req, res);
  next();
};
  
module.exports = talkValidation;