const { StatusCodes } = require('http-status-codes');

const { badRequest } = require('./http-error.controller');
const imagesService = require('../services/images.service');

const getImages = async(req, res) => {
  if (!req.params.id) {
    throw badRequest('enter board id');
  }

  const images = await imagesService.getImages(req.params.id);

  res.status(StatusCodes.OK).send(images);
};

const addImage = async(req, res) => {
  if (!req.params.id) {
    throw badRequest('Enter board id');
  }
  if (!req.body.url) {
    throw badRequest('Enter images url');
  }
  if (!req.body.url.length) {
    throw badRequest('Enter images url');
  }

  const image = await imagesService.addImage(req.params.id, req.body.url);

  res.status(StatusCodes.OK).send(image);
};

const getTags = async(req, res) => {
  if (!req.params.id) {
    throw badRequest('Enter board id');
  }
  if (!req.query.ids) {
    throw badRequest('Enter images ids');
  }

  const ids = JSON.parse(req.query.ids);

  if (!ids.length) {
    throw badRequest('Enter images ids');
  }

  const images = await imagesService.getTags(req.params.id, ids);

  res.status(StatusCodes.OK).send(images);
};

const deleteImages = async(req, res) => {
  if (!req.params.id) {
    throw badRequest('Enter board id');
  }
  if (!req.body.ids) {
    throw badRequest('Enter images ids');
  }
  if (!req.body.ids.length) {
    throw badRequest('Enter images ids');
  }

  const images = await imagesService.deleteImages(req.params.id, req.body.ids);

  res.status(StatusCodes.OK).send(images);
};

module.exports = {
  getImages,
  addImage,
  getTags,
  deleteImages,
};

