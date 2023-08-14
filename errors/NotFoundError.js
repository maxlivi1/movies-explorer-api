const { STATUS_CODES } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = STATUS_CODES.NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
