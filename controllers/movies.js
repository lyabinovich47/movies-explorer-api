const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
// const BadRequestError = require('../errors/bad-request-err');
const {
  // ERROR_CODE,
  // ERROR_NOTFOUND,
  // ERROR_SERVER,
  RES_OK,
  CREATED,
} = require('./status');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieSavedId)
    .orFail(() => new NotFoundError('Фильм с указанным Id не найден'))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалять чужой фильм!'));
      }
      return Movie.deleteOne(movie)
        .then(() => res.status(RES_OK).send({ message: 'Фильм удален' }));
    })
    .catch(next);
};

const getSavedMovies = (req, res, next) => {
  Movie.find(req.params.movieSavedId)
    .then((movies) => res.status(RES_OK).send(movies))
    .catch(next);
};

module.exports = {
  deleteMovie,
  getSavedMovies,
  createMovie,
};
