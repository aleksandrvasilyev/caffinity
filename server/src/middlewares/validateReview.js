import Cafe from "../models/Cafe.js";
import mongoose from "mongoose";

const validateReview = async (req, res, next) => {
  const { cafeId, review, rating } = req.body;

  if (typeof cafeId !== "string") {
    return res.status(400).send({
      success: false,
      msg: "Cafe id should be a string",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(cafeId)) {
    return res
      .status(400)
      .send({ success: false, msg: "Cafe id is not valid ObjectId" });
  }

  const cafeExists = await Cafe.exists({ _id: cafeId });

  if (!cafeExists) {
    return res.status(400).send({ success: false, msg: "Cafe does not exist" });
  }

  if (typeof review !== "string" || review.length < 10) {
    return res.status(400).send({
      success: false,
      msg: "Review should be a string and at least 10 symbols long",
    });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).send({
      success: false,
      msg: "Rating should be a number between 1 and 5",
    });
  }

  next();
};

export default validateReview;
