import { createUser } from "../util/auth.js";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const newUser = await createUser(username, password);

    res.status(201).send({
      success: true,
      result: { message: "User created successfully", user: newUser },
    });
  } catch (error) {
    next(error);
  }
};
