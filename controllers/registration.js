const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');
const RegistrationError = require('../errors/RegistrationError');
const RequestError = require('../errors/RequestError');

const registration = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(STATUS_CODES.CREATED).send({
      message: `Пользователь с email: ${user.email} успешно зарегистрирован.`,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new RegistrationError(
            'Пользователь с таким email уже зарегистрирован',
          ),
        );
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new RequestError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
        return;
      }
      next(err);
    });
};

module.exports = { registration };
