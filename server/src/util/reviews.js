import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import { logError } from "../util/logging.js";
import throwError from "./throwError.js";

export const addReview = async (req) => {
  const { cafeId, review, rating } = req.body;
  const user = req.user;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = user._id.toString();

    const addedReview = await Review.create(
      [
        {
          text: review,
          cafeId: cafeId,
          userId: userId,
          rating: rating,
        },
      ],
      { session },
    );

    const updatedCafe = await updateAverageRating(cafeId, session);

    await session.commitTransaction();
    session.endSession();

    return { updatedCafe, addedReview };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logError(error);
    throw error;
  }
};

export const editReview = async (req) => {
  const { reviewId, review, rating } = req.body;
  const user = req.user;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = user._id.toString();

    const reviewObject = await Review.findOne({
      _id: reviewId,
      userId: userId,
    });

    if (!reviewObject) {
      throwError("Permission denied");
    }

    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { text: review, rating: rating },
      { new: true, session },
    );

    const cafeId = updatedReview.cafeId.toString();

    const updatedCafe = await updateAverageRating(cafeId, session);

    await session.commitTransaction();
    session.endSession();

    return { updatedCafe, updatedReview };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logError(error);
    throw error;
  }
};

export const removeReview = async (req) => {
  const reviewId = req.body.reviewId;
  const user = req.user;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = user._id.toString();

    const reviewObject = await Review.findOne({
      _id: reviewId,
      userId: userId,
    });

    if (!reviewObject) {
      throwError("Permission denied");
    }

    const review = await Review.findOne({ _id: reviewId });
    const cafeId = review.cafeId;

    const deletedReview = await Review.deleteOne({ _id: reviewId });

    if (deletedReview.deletedCount === 0) {
      throwError("Review was not deleted, try again later!");
    }

    const updatedCafe = await updateAverageRating(cafeId, session);

    await session.commitTransaction();
    session.endSession();

    return updatedCafe;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logError(error);
    throw error;
  }
};

const updateAverageRating = async (cafeId, session) => {
  const reviews = await Review.find({ cafeId }).session(session);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const updatedCafe = await Cafe.findOneAndUpdate(
    { _id: cafeId },
    { rating: averageRating },
    { new: true, session },
  );

  return updatedCafe;
};
