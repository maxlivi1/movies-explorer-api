const { STATUS_CODES } = require('../utils/constants');

class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RegistrationError';
    this.statusCode = STATUS_CODES.BAD_REGISTRATION_ERROR;
  }
}

module.exports = RegistrationError;
