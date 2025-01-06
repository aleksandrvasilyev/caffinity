import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";

export const validateAddReview = async (req, res, next) => {
  const { cafeId, review, rating } = req.body;

  if (!(await validateReview(res, Cafe, cafeId, "Cafe", review, rating)))
    return;

  next();
};

export const validateEditReview = async (req, res, next) => {
  const { reviewId, review, rating } = req.body;

  if (!(await validateReview(res, Review, reviewId, "Review", review, rating)))
    return;

  next();
};

const validateReview = async (
  res,
  model,
  entityId,
  entityName,
  review,
  rating,
) => {
  if (typeof entityId !== "string") {
    res.status(400).send({
      success: false,
      msg: `${entityName} id should be a string`,
    });
    return false;
  }

  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    res.status(400).send({
      success: false,
      msg: `${entityName} id is not a valid ObjectId`,
    });
    return false;
  }

  const exists = await model.exists({ _id: entityId });
  if (!exists) {
    res.status(400).send({
      success: false,
      msg: `${entityName} does not exist`,
    });
    return false;
  }

  if (typeof review !== "string" || review.length < 10) {
    res.status(400).send({
      success: false,
      msg: "Review should be a string and at least 10 characters long",
    });
    return false;
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).send({
      success: false,
      msg: "Rating should be a number between 1 and 5",
    });
    return false;
  }

  return true;
};
