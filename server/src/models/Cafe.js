import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    address: { type: String, index: true },
    location: { latitude: Number, longitude: Number },
    rating: Number,
    photos: [String],
    utilities: [Number],
    foodOptions: [Number],
  },
  { timestamps: true },
);

const Cafe = mongoose.model("cafes", cafeSchema);

export default Cafe;
