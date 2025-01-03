import Cafe from "../models/Cafe.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import Utilities from "../models/Utilities.js";
import FoodOptions from "../models/FoodOptions.js";
import fs from "fs";
import { logInfo } from "../util/logging.js";

const cafesData = JSON.parse(
  fs.readFileSync("./src/db/data/cafes.json", "utf-8"),
);
const usersData = JSON.parse(
  fs.readFileSync("./src/db/data/users.json", "utf-8"),
);
const reviewsData = JSON.parse(
  fs.readFileSync("./src/db/data/reviews.json", "utf-8"),
);
const utilitiesData = JSON.parse(
  fs.readFileSync("./src/db/data/utilities.json", "utf-8"),
);
const foodOptionsData = JSON.parse(
  fs.readFileSync("./src/db/data/foodOptions.json", "utf-8"),
);

export async function seedData() {
  try {
    await Utilities.deleteMany({});
    await Utilities.insertMany(utilitiesData);
    logInfo("Utilities inserted to MongoDB Atlas");

    await FoodOptions.deleteMany({});
    await FoodOptions.insertMany(foodOptionsData);
    logInfo("FoodOptions inserted to MongoDB Atlas");

    await User.deleteMany({});
    await User.insertMany(usersData);
    logInfo("User inserted to MongoDB Atlas");

    await Cafe.deleteMany({});
    const cafes = await Cafe.insertMany(cafesData);
    logInfo("Cafe inserted to MongoDB Atlas");

    await Review.deleteMany({});
    const reviews = await Review.insertMany(reviewsData);
    logInfo("Review inserted to MongoDB Atlas");

    for (const cafe of cafes) {
      const cafeReviews = reviews.filter(
        (r) => r.cafeId.toString() === cafe._id.toString(),
      );

      if (cafeReviews.length > 0) {
        const avg =
          cafeReviews.reduce((sum, r) => sum + r.rating, 0) /
          cafeReviews.length;
        cafe.rating = avg;
        await cafe.save();
      } else {
        cafe.rating = 0;
        await cafe.save();
      }
    }
  } catch (error) {
    logInfo("Error inserting data:", error);
  }
}
