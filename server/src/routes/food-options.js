import express from "express";
import { getFoodOptions } from "../controllers/food-options.js";

const foodOptionsRouter = express.Router();

foodOptionsRouter.get("/", getFoodOptions);

export default foodOptionsRouter;
