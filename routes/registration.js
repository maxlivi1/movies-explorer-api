const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { registration } = require('../controllers/registration');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().required().min(2)
        .max(30),
      email: Joi.string().required().email(),
      password: Joi.string().trim().required().min(5)
        .max(50),
    }),
  }),
  registration,
);

module.exports = router;
