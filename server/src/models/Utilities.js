import mongoose from "mongoose";

const utilitiesSchema = new mongoose.Schema({
  index: Number,
  value: String,
});

const Utilities = mongoose.model("utilities", utilitiesSchema);

export default Utilities;
