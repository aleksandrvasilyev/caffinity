import Cafe from "../models/Cafe.js";
import FoodOptions from "../models/FoodOptions.js";
import buildCafeLookupPipeline from "../util/buildCafeLookupPipeline.js";
import { logError } from "../util/logging.js";
import paginate from "../util/pagination.js";
import mongoose from "mongoose";

export const getCafes = async (req, res, next) => {
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const search = req.query.search || null;
  const utilities = req.query.utilities
    ? req.query.utilities.split(",").map(Number)
    : null;
  const cityName = req.query.city;
  const foodOptionName = req.query.foodoption;
  let foodOptionIndex;

  if (foodOptionName) {
    const foodOption = await FoodOptions.find({ value: foodOptionName });
    foodOptionIndex = foodOption[0].index;
  }

  try {
    const paginatedCafes = await paginate({
      model: Cafe,
      limit,
      page,
      search,
      utilities,
      cityName,
      foodOptionIndex,
    });

    res.status(200).send({ success: true, result: paginatedCafes });
  } catch (error) {
    logError(error);
    next(error);
  }
};

export const getCafe = async (req, res, next) => {
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
    next(error);
  }
};
