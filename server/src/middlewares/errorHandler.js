/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong, try again later";

  return res.status(status).send({ success: false, msg: message });
};

export default errorHandler;
