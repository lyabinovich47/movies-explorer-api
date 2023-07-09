const { celebrate, Joi } = require('celebrate');
// const regExpUrl = require('../utils/constants');
const isUrl = require('../utils/constants');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserProfileBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl),
    trailerLink: Joi.string().required().custom(isUrl),
    thumbnail: Joi.string().required().custom(isUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieSavedId = celebrate({
  params: Joi.object().keys({
    movieSavedId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUserBody,
  validateLogin,
  validateUserProfileBody,
  validateMovieBody,
  validateMovieSavedId,
};
