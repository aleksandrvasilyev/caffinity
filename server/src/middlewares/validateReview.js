import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

export const validateAddReview = async (req, res, next) => {
  const { cafeId, review, rating } = req.body;

  if (!isObjectIdValidString(cafeId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Cafe id should be a string" });
  }

  if (!isObjectIdValidIdObject(cafeId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Cafe id is not a valid ObjectId" });
  }

  if (!(await isObjectExists(Cafe, cafeId))) {
    return res.status(400).send({ success: false, msg: "Cafe does not exist" });
  }

  if (!isReviewValid(review)) {
    return res.status(400).send({
      success: false,
      msg: "Review should be a string and at least 10 characters long",
    });
  }

  if (!isRatingValid(rating)) {
    return res.status(400).send({
      success: false,
      msg: "Rating should be a number between 1 and 5",
    });
  }

  next();
};

export const validateEditReview = async (req, res, next) => {
  const { reviewId, review, rating } = req.body;

  if (!isObjectIdValidString(reviewId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Review id should be a string" });
  }

  if (!isObjectIdValidIdObject(reviewId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Review id is not a valid ObjectId" });
  }

  if (!(await isObjectExists(Review, reviewId))) {
    return res
      .status(400)
      .send({ success: false, msg: "Review does not exist" });
  }

  if (!isReviewValid(review)) {
    return res.status(400).send({
      success: false,
      msg: "Review should be a string and at least 10 characters long",
    });
  }

  if (!isRatingValid(rating)) {
    return res.status(400).send({
      success: false,
      msg: "Rating should be a number between 1 and 5",
    });
  }

  next();
};

export const validateDeleteReview = async (req, res, next) => {
  const { reviewId } = req.body;

  if (!isObjectIdValidString(reviewId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Review id should be a string" });
  }

  if (!isObjectIdValidIdObject(reviewId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Review id is not a valid ObjectId" });
  }

  if (!(await isObjectExists(Review, reviewId))) {
    return res
      .status(400)
      .send({ success: false, msg: "Review does not exist" });
  }

  next();
};

const isObjectIdValidString = (cafeId) => {
  return typeof cafeId === "string";
};

const isObjectIdValidIdObject = (cafeId) => {
  return mongoose.Types.ObjectId.isValid(cafeId);
};

const isObjectExists = async (model, modelId) => {
  return await model.exists({ _id: modelId });
};

const isReviewValid = (review) => {
  return typeof review === "string" && review.length >= 10;
};

const isRatingValid = (rating) => {
  return typeof rating === "number" && rating >= 1 && rating <= 5;
};
