import { createUser, loginUser } from "../util/auth.js";
import { logError } from "../util/logging.js";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await createUser(username, password);

    res.status(201).send({
      success: true,
      result: { message: "User created successfully", user },
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { token, user } = await loginUser(username, password);

    res.status(200).send({
      success: true,
      result: { message: "User logged in successfully", token, user },
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};
