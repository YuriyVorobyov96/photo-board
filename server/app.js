const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const debug = require('debug')('Boards:app');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

const { MongoConnectionString } = require('./config/config');
const router = require('./routes');

const app = express();

mongoose
  .connect(MongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => debug('MongoDB connected'))
  .catch(err => debug(`MongoDB connection error: ${err}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('body-parser').urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

app.use('/api', router);

// Catch 404 and forward to error handler
app.use((req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Unexpected structure error', debug: error.message });
});

module.exports = app;
