const router = require('express').Router();
const {
  deleteMovie,
  getSavedMovies,
  createMovie,
} = require('../controllers/movies');

const { validateMovieBody, validateMovieSavedId } = require('../middlewares/validators');

router.post('/', validateMovieBody, createMovie);
router.get('/', getSavedMovies);
router.delete('/:movieSavedId', validateMovieSavedId, deleteMovie);

module.exports = router;
