const express = require('express');
const router = express.Router();

const { wrapController } = require('../helpers/wrapper.helper');
const imagesController = require('../controllers/images.controller');
const ctrl = wrapController(imagesController);

router.get('/board/:id', ctrl.getImages);
router.get('/board/:id/tags', ctrl.getTags);
router.post('/board/:id', ctrl.addImage);
router.delete('/board/:id', ctrl.deleteImages);

module.exports = router;
