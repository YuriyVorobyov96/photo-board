const { StatusCodes } = require('http-status-codes');

const { badRequest } = require('./http-error.controller');
const boardsService = require('../services/boards.service');

const createBoard = async(req, res) => {
  if (!req.body.name) {
    throw badRequest('enter board name');
  }
  if (!req.body.name.length) {
    throw badRequest('enter board name');
  }

  const board = await boardsService.createBoard(req.body.name);

  res.status(StatusCodes.OK).send(board);
};

const getBoards = async(req, res) => {
  const boardsNames = await boardsService.getBoards();

  res.status(StatusCodes.OK).send(boardsNames);
};

const deleteBoard = async(req, res) => {
  if (!req.params.id) {
    throw badRequest('Enter board id');
  }

  await boardsService.deleteBoard(req.params.id);

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createBoard,
  getBoards,
  deleteBoard,
};

