const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { login, registration, signout } = require('../controllers/users');
const { validateRegistrationBody, validateLoginBody } = require('../middlewares/validations');

router.post('/signup', validateRegistrationBody, registration);
router.post('/signin', validateLoginBody, login);
router.use(auth);
router.get('/signout', signout);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => next(new NotFoundError('Страница по запрашиваемому адресу не существует')));

module.exports = router;
