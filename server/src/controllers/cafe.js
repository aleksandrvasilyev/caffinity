import Cafe from "../models/Cafe.js";
import { logError } from "../util/logging.js";
import paginate from "../util/pagination.js";

export const getCafes = async (req, res) => {
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const page = Math.max(Number(req.query.page) || 1, 1);

  try {
    const paginatedCafes = await paginate(Cafe, limit, page);

    res.status(200).send({ success: true, result: paginatedCafes });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .send({ success: false, msg: "Unable to get cafes, try again later" });
  }
};
