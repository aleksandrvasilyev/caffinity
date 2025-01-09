import express from "express";
import { getUtilities } from "../controllers/utilities.js";

const utilitiesRouter = express.Router();

utilitiesRouter.get("/", getUtilities);

export default utilitiesRouter;
