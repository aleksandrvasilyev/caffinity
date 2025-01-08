import express from "express";
import { register } from "../controllers/auth.js";
import { validateRegistration } from "../middlewares/validateAuthCredentials.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegistration, register);

export default authRouter;
