import mongoose from "mongoose";

const foodOptionsSchema = new mongoose.Schema({
  index: Number,
  value: String,
});

const FoodOptions = mongoose.model("foodOptions", foodOptionsSchema);

export default FoodOptions;
