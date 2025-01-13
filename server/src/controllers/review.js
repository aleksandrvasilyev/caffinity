import { addReview, editReview, removeReview } from "../util/reviews.js";

export const storeReview = async (req, res, next) => {
  try {
    const addedReview = await addReview(req);

    res.status(201).send({
      success: true,
      result: { message: "Review created successfully", review: addedReview },
    });
  } catch (error) {
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
    next(error);
  }
};
