import express from "express";
import { storeReview, updateReview } from "../controllers/review.js";
import {
  validateAddReview,
  validateEditReview,
} from "../middlewares/validateReview.js";

const reviewRouter = express.Router();

reviewRouter.post("/", validateAddReview, storeReview);
reviewRouter.put("/", validateEditReview, updateReview);

export default reviewRouter;
