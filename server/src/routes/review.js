import express from "express";
import {
  getReviews,
  storeReview,
  updateReview,
  deleteReview,
} from "../controllers/review.js";
import {
  validateAddReview,
  validateEditReview,
  validateDeleteReview,
} from "../middlewares/validateReview.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.post("/", isAuthorized, validateAddReview, storeReview);
reviewRouter.put("/", isAuthorized, validateEditReview, updateReview);
reviewRouter.delete("/", isAuthorized, validateDeleteReview, deleteReview);

export default reviewRouter;
