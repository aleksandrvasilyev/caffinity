import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true, unique: true },
    avatar: { type: String },
    phoneNumber: { type: String },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cafe" }],
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = ["name", "email", "password", "username"];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.name == null) {
    errorList.push("name is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }

  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (userObject.username == null) {
    errorList.push("username is a required field");
  }

  return errorList;
};

export default User;
