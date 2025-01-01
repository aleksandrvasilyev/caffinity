import express from "express";
import { getCafes, getCafe } from "../controllers/cafe.js";

const cafeRouter = express.Router();

cafeRouter.get("/", getCafes);
cafeRouter.get("/:id", getCafe);

export default cafeRouter;
