import express from "express";
import { storeReview } from "../controllers/review.js";
import validateReview from "../middlewares/validateReview.js";

const reviewRouter = express.Router();

reviewRouter.post("/", validateReview, storeReview);

export default reviewRouter;
