const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./config');

mongoose.connect(MONGO_URL, {});

const app = express();
// app.use(cors({ origin: ['http://localhost:3001', 'https://lyabinovich47.nomoredomains.rocks'] }));
app.use(cors());

app.use(requestLogger); // логгер запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
