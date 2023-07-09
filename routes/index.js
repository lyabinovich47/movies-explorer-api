const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

// const ERROR_NOTFOUND = 404;

const userRoutes = require('./users');
const movieRoutes = require('./movies');

const { validateUserBody, validateLogin } = require('../middlewares/validators');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => {
  // res.status(ERROR_NOTFOUND).send({ message: 'Страница по указанному пути не найдена' });
  next(new NotFoundError('Страница по указанному пути не найдена'));
});

module.exports = router;
