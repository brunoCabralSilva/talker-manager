const tokenValidation = (req, res, next) => {
  // res.status(401).json({
  //     message: 'Token não encontrado',
  // });
  // res.status(401).json({
  //   message: 'Token inválido',
  // });
  next();
};

module.exports = tokenValidation;