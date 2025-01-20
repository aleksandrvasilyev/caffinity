import FoodOptions from "../models/FoodOptions.js";
import { logError } from "../util/logging.js";

export const getFoodOptions = async (req, res, next) => {
  try {
    const foodOptions = await FoodOptions.find().select("-__v");
    res.status(200).send({ success: true, result: foodOptions });
  } catch (error) {
    logError(error);
    next(error);
  }
};
