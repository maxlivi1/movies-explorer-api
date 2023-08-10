const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getSavedMovies, saveMovie, deleteMovie } = require('../controllers/movies');
const { URL_PATTERN } = require('../utils/constants');

router.get('/', getSavedMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    owner: Joi.string().required().trim(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
}), saveMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
