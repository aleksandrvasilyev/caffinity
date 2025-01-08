import bcrypt from "bcrypt";
import User from "../models/User.js";

export const createUser = async (username, password) => {
  const userExists = await User.findOne({ username });

  if (userExists) {
    throw {
      status: 400,
      message: "A user with this username already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    username,
    password: hashedPassword,
  });

  if (!newUser) {
    throw {
      status: 400,
      message: "Error when creating new user, try again later",
    };
  }

  const user = await User.findById(newUser._id).select("-password -__v");

  return user;
};
