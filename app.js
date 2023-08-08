const console = require('console');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./helpers/rateLimit');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
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
    origin: ['http://localhost:3000'],
    credentials: true,
    maxAge: 120,
  }),
);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log('Слушаю порт:', SERVER_PORT);
});
