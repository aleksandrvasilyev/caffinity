import supertest from "supertest";
import mongoose from "mongoose";
import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";
import Cafe from "../models/Cafe.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const request = supertest(app);

beforeAll(async () => {
  await connectToMockDB();
});

afterEach(async () => {
  await clearMockDatabase();
});

afterAll(async () => {
  await closeMockDatabase();
});

const createTestData = async () => {
  await Cafe.create({
    _id: "64b8f5d2dc1b8a1234567808",
    title: "Café De Plantage",
    description: "Stylish café near the zoo with botanical surroundings.",
    address: "Plantage Middenlaan 2, 1018 DD Amsterdam",
    location: {
      latitude: 52.3679,
      longitude: 4.9135,
    },
    rating: 3.5,
    photos: ["plantage-1.png", "plantage-2.jpg", "plantage-3.jpg"],
    utilities: [0, 7, 8, 9, 10],
    foodOptions: [1, 2, 8, 10],
  });

  await Review.create({
    _id: "6761e0b294a9afdb262f170b",
    text: "Cozy cafe with excellent coffee and warm lighting.",
    cafeId: "64b8f5d2dc1b8a1234567808",
    userId: "677fe8d85ce3bafd226ed666",
    rating: 3,
  });

  await Review.create({
    _id: "677fd998593c5276294d2076",
    text: "Cafe with good coffee.",
    cafeId: "64b8f5d2dc1b8a1234567808",
    userId: "677fe8d85ce3bafd226ed777",
    rating: 3,
  });

  await User.create({
    _id: "677fe8d85ce3bafd226ed666",
    username: "alex",
    password: "$2b$12$lZgZw1x3.AWyGw6zU.cbY.s4ZNyqPx8/xIRrUfYx7n.HXO6rzGD9a",
  });

  await User.create({
    _id: "677fe8d85ce3bafd226ed777",
    username: "john",
    password: "$2b$12$lZgZw1x3.AWyGw6zU.cbY.s4ZNyqPx8/xIRrUfYx7n.HXO6rzGD9a",
  });
};

const token = jwt.sign(
  { userId: "677fe8d85ce3bafd226ed666" },
  process.env.JWT_SECRET,
  { expiresIn: "1h" },
);

describe("POST /api/reviews", () => {
  it("Should return an error if there is no cafe id", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe id should be a string");
  });

  it("Should return an error if cafe id is invalid Object id", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "64b8f5d2dc1b8a1234567808-",
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe id is not a valid ObjectId");
  });

  it("Should return an error if cafe has not been found", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "14b8f5d2dc1b8a1234567808",
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe does not exist");
  });

  it("Should return an error if there is no review", async () => {
    await createTestData();

    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "64b8f5d2dc1b8a1234567808",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Review should be a string and at least 10 characters long",
    );
  });

  it("Should return an error if review is less than 10 characters", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "64b8f5d2dc1b8a1234567808",
        review: "test",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Review should be a string and at least 10 characters long",
    );
  });

  it("Should return an error if rating is more than 5", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "64b8f5d2dc1b8a1234567808",
        review: "test review",
        rating: 6,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Rating should be a number between 1 and 5",
    );
  });

  it("Should return an error if rating is less than 1", async () => {
    await createTestData();
    const response = await request
      .post("/api/reviews")
      .set("Authorization", token)
      .send({
        cafeId: "64b8f5d2dc1b8a1234567808",
        review: "test review",
        rating: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Rating should be a number between 1 and 5",
    );
  });

  it("Should return a success message if review was created successfully", async () => {
    await createTestData();
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const response = await request
        .post("/api/reviews")
        .set("Authorization", token)
        .send({
          cafeId: "64b8f5d2dc1b8a1234567808",
          review: "test review",
          rating: 4,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.result.review.updatedCafe._id).toBe(
        "64b8f5d2dc1b8a1234567808",
      );
      expect(response.body.result.review.addedReview[0].cafeId).toBe(
        "64b8f5d2dc1b8a1234567808",
      );
      expect(response.body.result.review.addedReview[0].text).toBe(
        "test review",
      );
      expect(response.body.result.review.addedReview[0].rating).toBe(4);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });
});

describe("PUT /api/reviews", () => {
  it("Should return an error if there is no review id", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Review id should be a string");
  });

  it("Should return an error if there is no review id", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Review id should be a string");
  });

  it("Should return an error if review id is invalid Object id", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "64b8f5d2dc1b8a1234567808-",
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Review id is not a valid ObjectId");
  });

  it("Should return an error if review has not been found", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "14b8f5d2dc1b8a1234567808",
        review: "test review",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Review does not exist");
  });

  it("Should return an error if there is no review", async () => {
    await createTestData();

    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "6761e0b294a9afdb262f170b",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Review should be a string and at least 10 characters long",
    );
  });

  it("Should return an error if review is less than 10 characters", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "6761e0b294a9afdb262f170b",
        review: "test",
        rating: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Review should be a string and at least 10 characters long",
    );
  });

  it("Should return an error if rating is more than 5", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "6761e0b294a9afdb262f170b",
        review: "test review",
        rating: 6,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Rating should be a number between 1 and 5",
    );
  });

  it("Should return an error if rating is less than 1", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "6761e0b294a9afdb262f170b",
        review: "test review",
        rating: 0,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual(
      "Rating should be a number between 1 and 5",
    );
  });

  it("Should return a success message if review was updated successfully", async () => {
    await createTestData();
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const response = await request
        .put("/api/reviews")
        .set("Authorization", token)
        .send({
          reviewId: "6761e0b294a9afdb262f170b",
          review: "test review",
          rating: 4,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      expect(response.body.result.review.updatedCafe._id).toBe(
        "64b8f5d2dc1b8a1234567808",
      );
      expect(response.body.result.review.updatedReview.cafeId).toBe(
        "64b8f5d2dc1b8a1234567808",
      );
      expect(response.body.result.review.updatedReview.text).toBe(
        "test review",
      );
      expect(response.body.result.review.updatedReview.rating).toBe(4);

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });

  it("Should return a permission denied error", async () => {
    await createTestData();
    const response = await request
      .put("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "677fd998593c5276294d2076",
        review: "test review",
        rating: 3,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Permission denied");
  });
});

describe("DELETE /api/reviews", () => {
  it("Should return a permission denied error", async () => {
    await createTestData();
    const response = await request
      .delete("/api/reviews")
      .set("Authorization", token)
      .send({
        reviewId: "677fd998593c5276294d2076",
        review: "test review",
        rating: 3,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Permission denied");
  });

  it("Should return a success message if review was deleted successfully", async () => {
    await createTestData();
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const response = await request
        .delete("/api/reviews")
        .set("Authorization", token)
        .send({
          reviewId: "6761e0b294a9afdb262f170b",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.message).toBe("Review deleted successfully");

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  });
});

describe("GET /api/reviews", () => {
  it("Should return a list of reviews", async () => {
    await createTestData();
    const response = await request.get(
      "/api/reviews?cafe=64b8f5d2dc1b8a1234567808",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.data.length).toEqual(2);
  });

  it("Should return an error if cafe id is not provided", async () => {
    await createTestData();
    const response = await request.get("/api/reviews");

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Cafe id is required");
  });
});
