import express from "express";
import { register, login } from "../controllers/auth.js";
import { validateRegistration } from "../middlewares/validateAuthCredentials.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegistration, register);
authRouter.post("/login", validateRegistration, login);

export default authRouter;
