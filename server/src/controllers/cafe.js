import Cafe from "../models/cafe.js";
import { logError } from "../util/logging.js";

export const getCafes = async (req, res) => {
  try {
    const cafe = await Cafe.find();
    res.status(200).json({ success: true, result: cafe });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
  }
};
