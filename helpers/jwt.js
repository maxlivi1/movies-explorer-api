const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_STRING } = require('../envconfig');

const getJwtToken = (id) => jwt.sign({ _id: id }, SECRET_STRING, { expiresIn: '7d' });

const isAuthorized = (token) => jwt.verify(token, SECRET_STRING, (err, payload) => {
  if (err) return false;

  return User.findOne({ _id: payload.id })
    .then((user) => Boolean(user));
});

const getPayload = (token) => jwt.verify(token, SECRET_STRING, (err, payload) => {
  if (err) return null;
  return payload;
});

module.exports = {
  getJwtToken,
  isAuthorized,
  getPayload,
};
