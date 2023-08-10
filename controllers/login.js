const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { getJwtToken } = require('../helpers/jwt');
const AuthError = require('../errors/AuthError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
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

module.exports = { login };
