import { addReview, editReview } from "../util/reviews.js";
import Review from "../models/Review.js";

export const storeReview = async (req, res, next) => {
  try {
    const addedReview = await addReview(req.body);

    res.status(201).send({ success: true, result: addedReview });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await editReview(req.body);

    res.status(200).send({ success: true, result: updatedReview });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  const reviewId = req.body.reviewId;

  try {
    const deletedReview = await Review.deleteOne({ _id: reviewId });

    if (deletedReview.deletedCount === 0) {
      return res.status(400).send({
        success: false,
        msg: "Review was not deleted, try again later!",
      });
    }

    res
      .status(200)
      .send({ success: true, result: "Review successfully deleted!" });
  } catch (error) {
    next(error);
  }
};
