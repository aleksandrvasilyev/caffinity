import Utilities from "../models/Utilities.js";
import { logError } from "../util/logging.js";

export const getUtilities = async (req, res, next) => {
  try {
    const utilities = await Utilities.find().select("-__v");
    res.status(200).send({ success: true, result: utilities });
  } catch (error) {
    logError(error);
    next(error);
  }
};
