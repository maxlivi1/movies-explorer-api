const users = require('./users');
const movies = require('./movies');
const registration = require('./registration');
const login = require('./login');

const router = {
  users,
  movies,
  registration,
  login,
};

module.exports = router;
