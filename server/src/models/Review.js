import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    text: { type: String },
    cafeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cafe",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
