import supertest from "supertest";
import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";
import Cafe from "../models/Cafe.js";
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

describe("POST /api/favorites", () => {
  it("Should return an error if there is no cafe id", async () => {
    await createTestData();
    const response = await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe id is required!");
  });

  it("Should return an error if cafe is not found", async () => {
    await createTestData();
    const response = await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({ cafeId: "64b8f5d2dc1b8a1234567801" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe not found!");
  });

  it("Should return an error if cafe is already in favorite list", async () => {
    await createTestData();
    await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({ cafeId: "64b8f5d2dc1b8a1234567808" });

    const response = await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({ cafeId: "64b8f5d2dc1b8a1234567808" });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toEqual("Cafe is already in the favorite list!");
  });

  it("Should return a success message when add cafe to the favorite list", async () => {
    await createTestData();

    const response = await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({ cafeId: "64b8f5d2dc1b8a1234567808" });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(
      response.body.result.favourites.includes("64b8f5d2dc1b8a1234567808"),
    ).toBe(true);
  });
});

describe("GET /api/favorites", () => {
  it("Should return a success response when cafe was added to favorites", async () => {
    await createTestData();

    await request
      .post("/api/favorites")
      .set("Authorization", token)
      .send({ cafeId: "64b8f5d2dc1b8a1234567808" });

    const response = await request
      .get("/api/favorites")
      .set("Authorization", token);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result[0]._id).toEqual("64b8f5d2dc1b8a1234567808");
  });
});
