import supertest from "supertest";

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";
import User from "../models/User.js";

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

const createUser = async () => {
  await User.create({
    username: "alex",
    password: "$2b$12$uQiEx6jxr4kfL5XGTpPsB.PdqHafxi5ME7/UispauQqMtNdpRat62",
  });
};

describe("POST /api/register/", () => {
  it("Should return a successful result", async () => {
    const response = await request.post("/api/register").send({
      username: "testUsername",
      password: "123456",
    });

    expect(response.status).toBe(201);
    expect(response.body.result.message).toBe("User created successfully");
    expect(response.body.result.user.username).toBe("testUsername");
  });

  it("Should return an error if username is not valid", async () => {
    const response = await request.post("/api/register").send({
      username: "te",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "Username should be at least 3 characters long!",
    );
  });

  it("Should return an error if password is not valid", async () => {
    const response = await request.post("/api/register").send({
      username: "test",
      password: "1234",
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "Password should be at least 6 characters long!",
    );
  });

  it("Should return an error if username is not provided", async () => {
    const response = await request.post("/api/register").send({
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("Username and password are required!");
  });

  it("Should return an error if username is already exists", async () => {
    await createUser();

    const response = await request.post("/api/register").send({
      username: "alex",
      password: "123456",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.msg).toBe("A user with this username already exists");
  });
});
