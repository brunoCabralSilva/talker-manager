const watchedAtValidation = (req, res, next) => {
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
  next();
};

module.exports = watchedAtValidation;