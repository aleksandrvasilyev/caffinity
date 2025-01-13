import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuthorized = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: "Authorization token is required!" });
  }

  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "You are not logged in!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Invalid token" });
    }

    const userID = decoded.userId;

    const user = await User.findOne({ _id: userID });

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    req.user = user;

    next();
  });
};

export default isAuthorized;
