import express from "express";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../controllers/favorites.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const favoritesRouter = express.Router();

favoritesRouter.post("/", isAuthorized, addToFavorites);
favoritesRouter.delete("/", isAuthorized, deleteFromFavorites);

export default favoritesRouter;
