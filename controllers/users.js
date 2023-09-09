const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const RegistrationError = require('../errors/RegistrationError');
const AuthError = require('../errors/AuthError');
const { getJwtToken } = require('../helpers/jwt');
const { STATUS_CODES } = require('../utils/constants');

const registration = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const token = getJwtToken(user._id);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .status(STATUS_CODES.CREATED)
        .send({
          message: `Пользователь с email: ${user.email} успешно зарегистрирован.`,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new RegistrationError(
            'Пользователь с таким email уже зарегистрирован'
          )
        );
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new RequestError(
            'Переданы некорректные данные при создании пользователя'
          )
        );
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) throw new AuthError('Неверно указан логин или пароль');

      bcrypt.compare(password, user.password, (err, isValid) => {
        try {
          if (!isValid || err) {
            throw new AuthError('Неверно указан логин или пароль');
          }
          const token = getJwtToken(user._id);
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: 'none',
              secure: true,
            })
            .send({ message: 'Вы авторизованы' });
        } catch (error) {
          next(error);
        }
      });
    })
    .catch(next);
};

const signout = (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: 'Пользователь разлогинен.' });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Передан невалидный id пользователя'));
        return;
      }
      next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new RegistrationError(
            'Пользователь с таким email уже зарегистрирован'
          )
        );
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new RequestError('Передан невалидный id пользователя'));
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new RequestError(
            'Переданы некорректные данные при обновлении пользователя'
          )
        );
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  registration,
  login,
  signout,
};
