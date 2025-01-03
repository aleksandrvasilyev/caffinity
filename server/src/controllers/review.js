import { addReview } from "../util/reviews.js";

export const storeReview = async (req, res, next) => {
  try {
    const addedReview = await addReview(req.body);

    res.status(200).send({ success: true, result: addedReview });
  } catch (error) {
    next(error);
  }
};
