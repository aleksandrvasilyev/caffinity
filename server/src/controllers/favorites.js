import { logError } from "../util/logging.js";
import User from "../models/User.js";
import Cafe from "../models/Cafe.js";

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const favorites = await Cafe.find({ _id: { $in: user.favourites } });

    res.status(200).send({ success: true, result: favorites });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const cafeId = req.body.cafeId;
    const userId = req.user._id;

    if (!cafeId) {
      return res
        .status(400)
        .send({ success: false, msg: "Cafe id is required!" });
    }

    const cafe = await Cafe.findById(cafeId);
    const user = await User.findById(userId);

    if (!cafe) {
      return res.status(400).send({ success: false, msg: "Cafe not found!" });
    }

    if (user.favourites.includes(cafeId)) {
      return res
        .status(400)
        .send({ success: false, msg: "Cafe is already in the favorite list!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { favourites: cafeId } },
      { new: true },
    );

    res.status(200).send({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const deleteFromFavorites = async (req, res, next) => {
  try {
    const cafeId = req.body.cafeId;
    const userId = req.user._id;

    if (!cafeId) {
      return res
        .status(400)
        .send({ success: false, msg: "Cafe id is required!" });
    }

    const cafe = await Cafe.findById(cafeId);
    const user = await User.findById(userId);

    if (!cafe) {
      return res.status(400).send({ success: false, msg: "Cafe not found!" });
    }

    if (!user.favourites.includes(cafeId)) {
      return res
        .status(400)
        .send({ success: false, msg: "Cafe is not in the favorite list!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { favourites: cafeId } },
      { new: true },
    );

    res.status(200).send({ success: true, result: updatedUser });
  } catch (error) {
    logError(error);
    next(error);
  }
};
