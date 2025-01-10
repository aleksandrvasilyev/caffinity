import bcrypt from "bcrypt";
import User from "../models/User.js";
import { logError } from "../util/logging.js";
import jwt from "jsonwebtoken";
import throwError from "./throwError.js";

export const createUser = async (username, password) => {
  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      throwError("A user with this username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (!newUser) {
      throwError("Error when creating new user, try again later");
    }

    const user = await User.findById(newUser._id).select("-password -__v");

    return user;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username }).select("-__v").lean();

    if (!user) {
      throwError("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throwError("Invalid credentials!");
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    delete user.password;

    return { token, user };
  } catch (error) {
    logError(error);
    throw error;
  }
};
