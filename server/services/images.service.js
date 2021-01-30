const got = require('got');
const mongoose = require('mongoose');

const Images = require('../models/images');
const Boards = require('../models/boards');

const { badRequest } = require('../controllers/http-error.controller');
const {
  ImaggaApiKey,
  ImaggaApiSecret,
  ImaggaTagsUrl,
} = require('../config/config');

const getImages = async boardId => {
  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    throw badRequest('Invalid id');
  }

  const board = await Boards
    .findOne({ _id: boardId }, '_id');

  if (!board) {
    throw badRequest(`Board doesn't exist`);
  }

  return Images
    .find({ boardId }).sort('-date');
};

const addImage = async(boardId, url) => {
  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    throw badRequest('Invalid id');
  }

  const board = await Boards
    .findOne({ _id: boardId }, '_id');

  if (!board) {
    throw badRequest(`Board doesn't exist`);
  }

  return new Images({
    url,
    boardId,
  }).save();
};

const getTags = async(boardId, imagesIds) => {
  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    throw badRequest('Invalid id');
  }

  const board = await Boards
    .findOne({ _id: boardId }, '_id');

  if (!board) {
    throw badRequest(`Board doesn't exist`);
  }

  const images = await Images
    .find({ _id: { $in: imagesIds } }, 'url');

  if (!images.length) {
    return [];
  }

  for await (const image of images) {
    const tagsUrl = `${ImaggaTagsUrl}${encodeURIComponent(image.url)}`;

    const response = await got(
      tagsUrl,
      {
        username: ImaggaApiKey,
        password: ImaggaApiSecret,
        responseType: 'json',
      },
    );

    const tags = response.body.result.tags.map(tagInfo => tagInfo.tag.en);


    await Images
      .findOneAndUpdate(
        { _id: image._id },
        { tags },
        {
          new: true,
          useFindAndModify: false,
        },
      );
  }

  return Images
    .find({ boardId }).sort('-date');
};

const deleteImages = async(boardId, imageIds) => {
  await Images.deleteMany({ _id: { $in: imageIds } });

  return getImages(boardId);
};

module.exports = {
  getImages,
  addImage,
  getTags,
  deleteImages,
};
