import mongoose from "mongoose";
import dotenv from "dotenv";
import { logInfo, logError } from "../util/logging.js";
import { seedData } from "./seedLogic.js";
dotenv.config();

(async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logInfo("Connected to MongoDB Atlas");

    await seedData();

    logInfo("Data inserted successfully");
  } catch (error) {
    logError("Error inserting data:", error);
  } finally {
    await mongoose.connection.close();
    logInfo("Connection to MongoDB closed");
  }
})();
