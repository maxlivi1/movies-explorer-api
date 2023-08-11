const router = require('express').Router();
const {
  getSavedMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateParamsObjectId,
  validateMovieBody,
} = require('../middlewares/validations');

router.get('/', getSavedMovies);
router.post('/', validateMovieBody, saveMovie);
router.delete('/:movieId', validateParamsObjectId, deleteMovie);

module.exports = router;
