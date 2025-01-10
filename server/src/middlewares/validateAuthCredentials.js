import throwError from "../util/throwError.js";

export const validateRegistration = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ success: false, msg: "Username and password are required!" });
  }

  const isUserNameValid = username.length >= 3;

  if (!isUserNameValid) {
    throwError("Username should be at least 3 characters long!");
  }

  const isPasswordValid = password.length >= 6;

  if (!isPasswordValid) {
    throwError("Password should be at least 6 characters long!");
  }

  next();
};
