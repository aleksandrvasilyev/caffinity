import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import { logError } from "../util/logging.js";

export const addReview = async ({ cafeId, review, rating }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // to-do validate authorized user

    const userId = "6776852f29c6508b1898f99e";

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
    logError("Transaction error:", error);
    throw error;
  }
};

export const editReview = async ({ reviewId, review, rating }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  // const userId = "64b8f600dc1b8a1234567902";

  try {
    // to-do validate authorized user

    // const reviewObject = await Review.findOne({
    // _id: reviewId,
    // userId: userId,
    // });

    // if (!reviewObject) {
    // throw { status: 400, message: "Review id or User id is invalid!" };
    // }

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
    logError("Transaction error:", error);
    throw error;
  }
};

export const removeReview = async (reviewId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // to-do validate authorized user

    // const userId = "64b8f600dc1b8a1234567902";

    const review = await Review.findOne({ _id: reviewId });
    const cafeId = review.cafeId;

    const deletedReview = await Review.deleteOne({ _id: reviewId });

    if (deletedReview.deletedCount === 0) {
      throw {
        status: 400,
        message: "Review was not deleted, try again later!",
      };
    }

    const updatedCafe = await updateAverageRating(cafeId, session);

    await session.commitTransaction();
    session.endSession();

    return updatedCafe;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    logError("Transaction error:", error);
    throw error;
  }
};

const updateAverageRating = async (cafeId, session) => {
  const reviews = await Review.find({ cafeId }).session(session);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const updatedCafe = await Cafe.findOneAndUpdate(
    { _id: cafeId },
    { rating: averageRating },
    { new: true, session },
  );

  return updatedCafe;
};
