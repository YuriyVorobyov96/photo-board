const Boards = require('../models/boards');
const Images = require('../models/images');

const { badRequest } = require('../controllers/http-error.controller');

const createBoard = async name => {
  const board = await Boards
    .findOne({ name }, '_id');

  if (board) {
    throw badRequest('Board already exists');
  }

  return new Boards({ name }).save();
};

const getBoards = () => Boards
  .find({}, '_id, name').sort('date');

const deleteBoard = id => Promise.all([
  Boards
    .deleteOne({ _id: id }),
  Images
    .deleteMany({ boardId: id }),
]);

module.exports = {
  createBoard,
  getBoards,
  deleteBoard,
};
