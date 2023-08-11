const console = require('console');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./helpers/rateLimit');

const appRouter = require('./routes');
const notFoundPage = require('./controllers/notFoundPage');
const { signout } = require('./controllers/signout');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { auth } = require('./middlewares/auth');

const { SERVER_PORT, DB_URL } = require('./envconfig');

const app = express();
mongoose.connect(DB_URL);

app.use(requestLogger);

app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  helmet({
    contentSecurityPolicy: false,
    xDownloadOptions: false,
    xPoweredBy: false,
  }),
);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://diploma.maxlivi.ru'],
    credentials: true,
    maxAge: 120,
  }),
);

app.use('/signup', appRouter.registration);
app.use('/signin', appRouter.login);
app.get('/signout', auth, signout);
app.use('/users', auth, appRouter.users);
app.use('/movies', auth, appRouter.movies);
app.use('*', auth, notFoundPage);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Слушаю порт:', SERVER_PORT);
});
