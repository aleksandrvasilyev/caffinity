import express from "express";
import {
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

reviewRouter.post("/", isAuthorized, validateAddReview, storeReview);
reviewRouter.put("/", isAuthorized, validateEditReview, updateReview);
reviewRouter.delete("/", isAuthorized, validateDeleteReview, deleteReview);

export default reviewRouter;
