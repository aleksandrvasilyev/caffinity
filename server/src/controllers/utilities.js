import Utilities from "../models/Utilities.js";
import { logError } from "../util/logging.js";

export const getUtilities = async (req, res) => {
  try {
    const utilities = await Utilities.find().select("-__v");
    res.status(200).send({ success: true, result: utilities });
  } catch (error) {
    logError(error);
    res.status(500).send({
      success: false,
      msg: "Unable to get utilities, try again later",
    });
  }
};
