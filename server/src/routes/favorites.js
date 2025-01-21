import express from "express";
import {
  addToFavorites,
  deleteFromFavorites,
  getFavorites,
} from "../controllers/favorites.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const favoritesRouter = express.Router();

favoritesRouter.post("/", isAuthorized, addToFavorites);
favoritesRouter.delete("/", isAuthorized, deleteFromFavorites);
favoritesRouter.get("/", isAuthorized, getFavorites);

export default favoritesRouter;
