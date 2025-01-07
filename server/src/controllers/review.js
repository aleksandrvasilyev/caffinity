import { addReview, editReview } from "../util/reviews.js";

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
