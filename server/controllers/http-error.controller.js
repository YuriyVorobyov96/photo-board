const { StatusCodes } = require('http-status-codes');

const SOMETHING_WENT_WRONG = 800;

const makeError = (code, why) => {
  const errorCode = new Error(SOMETHING_WENT_WRONG);

  errorCode.data = why;
  errorCode.code = code;

  return errorCode;
};

makeError.bind = code => why => makeError(code, why);

makeError.unprocessableEntity = makeError.bind(StatusCodes.UNPROCESSABLE_ENTITY);
makeError.badRequest = makeError.bind(StatusCodes.BAD_REQUEST);
makeError.notFound = makeError.bind(StatusCodes.NOT_FOUND);

module.exports = makeError;
