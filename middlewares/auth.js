const AuthError = require('../errors/AuthError');
const { isAuthorized, getPayload } = require('../helpers/jwt');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt || !isAuthorized(jwt)) {
    next(new AuthError('Необходимо авторизоваться'));
    return;
  }
  req.user = { _id: getPayload(jwt)._id };
  next();
};

module.exports = { auth };
