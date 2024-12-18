import express from "express";
import { getCafes } from "../controllers/cafe.js";

const cafeRouter = express.Router();

cafeRouter.get("/", getCafes);

export default cafeRouter;
