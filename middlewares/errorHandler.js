const { STATUS_CODES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, message = 'Что-то пошло не так. Ошибка сервера.' } = err;

  res.status(statusCode).send({ message });

  next();
};

module.exports = { errorHandler };
