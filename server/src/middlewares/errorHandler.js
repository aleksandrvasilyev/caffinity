import { logError } from "../util/logging.js";

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error, req, res, next) => {
  if (error.statusCode) {
    return res
      .status(error.statusCode)
      .send({ success: false, msg: error.message });
  }

  logError(error);

  res
    .status(500)
    .send({ success: false, msg: "Unable to store review, try again later" });
};

export default errorHandler;
