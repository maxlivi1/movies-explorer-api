const NotFoundError = require('../errors/NotFoundError');

const getNotFoundPageError = (req, res, next) => {
  next(new NotFoundError('Страница по запрашиваемому адресу не существует'));
};

module.exports = getNotFoundPageError;
