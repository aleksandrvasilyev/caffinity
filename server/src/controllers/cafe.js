import Cafe from "../models/Cafe.js";
import buildCafeLookupPipeline from "../util/buildCafeLookupPipeline.js";
import { logError } from "../util/logging.js";
import paginate from "../util/pagination.js";
import mongoose from "mongoose";

export const getCafes = async (req, res) => {
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const search = req.query.search || null;
  const utilities = req.query.utilities
    ? req.query.utilities.split(",").map(Number)
    : null;

  try {
    const paginatedCafes = await paginate(Cafe, limit, page, search, utilities);

    res.status(200).send({ success: true, result: paginatedCafes });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .send({ success: false, msg: "Unable to get cafes, try again later" });
  }
};

export const getCafe = async (req, res) => {
  const cafeId = req.params.id;

  try {
    const validCafeId = mongoose.Types.ObjectId.isValid(cafeId);

    if (!validCafeId) {
      return res
        .status(400)
        .send({ success: false, msg: "Cafe id is invalid!" });
    }

    const cafe = await Cafe.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(cafeId),
          },
        },
        ...buildCafeLookupPipeline(),
      ],
      { maxTimeMS: 60000 },
    );

    if (!cafe) {
      return res.status(404).send({ success: false, msg: "Cafe not found!" });
    }

    res.send({ success: true, result: cafe });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .send({ success: false, msg: "Unable to get cafe, try again later" });
  }
};
