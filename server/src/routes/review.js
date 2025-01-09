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

const reviewRouter = express.Router();

reviewRouter.post("/", validateAddReview, storeReview);
reviewRouter.put("/", validateEditReview, updateReview);
reviewRouter.delete("/", validateDeleteReview, deleteReview);

export default reviewRouter;
