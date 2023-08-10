const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/login');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim().required(),
  }),
}), login);

module.exports = router;
