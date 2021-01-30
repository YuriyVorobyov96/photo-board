const express = require('express');
const router = express.Router();

const { wrapController } = require('../helpers/wrapper.helper');
const boardsController = require('../controllers/boards.controller');
const ctrl = wrapController(boardsController);

router.post('/', ctrl.createBoard);
router.get('/', ctrl.getBoards);
router.delete('/:id', ctrl.deleteBoard);

module.exports = router;
