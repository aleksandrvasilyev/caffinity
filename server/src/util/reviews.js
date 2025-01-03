import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import { logError } from "../util/logging.js";

export const addReview = async ({ cafeId, review, rating }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
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

    await Cafe.findById(cafeId);

    const reviews = await Review.find({ cafeId: cafeId }).session(session);

    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    const updatedCafe = await Cafe.findOneAndUpdate(
      { _id: cafeId },
      { rating: averageRating },
      { new: true, session },
    );

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
