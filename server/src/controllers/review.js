import { addReview, editReview, removeReview } from "../util/reviews.js";
import { logError } from "../util/logging.js";
import paginate from "../util/pagination.js";
import Review from "../models/Review.js";

export const getReviews = async (req, res, next) => {
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const cafeId = req.query.cafe;

  try {
    const paginatedReviews = await paginate({
      model: Review,
      limit,
      page,
      cafeId,
    });

    res.status(200).send({ success: true, result: paginatedReviews });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const storeReview = async (req, res, next) => {
  try {
    const addedReview = await addReview(req);

    res.status(201).send({
      success: true,
      result: { message: "Review created successfully", review: addedReview },
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const updatedReview = await editReview(req);

    res.status(200).send({
      success: true,
      result: {
        message: "Review updated successfully",
        review: updatedReview,
      },
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const updatedCafe = await removeReview(req);

    res.status(200).send({
      success: true,
      result: {
        message: "Review deleted successfully",
        updatedCafe,
      },
    });
  } catch (error) {
    logError(error);
    next(error);
  }
};
