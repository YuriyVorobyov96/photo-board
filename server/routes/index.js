const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = new express.Router();

const imagesRouter = require('./images');
const boardsRouter = require('./boards');

router.use('/images', imagesRouter);
router.use('/boards', boardsRouter);

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  const message = error.data ? error.data : { serverError: error.message };

  console.log(message);

  res
    .status(error.code || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: message });
});

module.exports = router;
