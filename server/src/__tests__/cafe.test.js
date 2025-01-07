import supertest from "supertest";

import {
  connectToMockDB,
  closeMockDatabase,
  clearMockDatabase,
} from "../__testUtils__/dbMock.js";
import app from "../app.js";
import { seedData } from "../db/seedLogic.js";

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

describe("GET /api/cafes/", () => {
  it("Should return an empty array if there are no cafes in the db", async () => {
    const response = await request.get("/api/cafes");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.data).toEqual([]);
  });

  it("Should return all the cafes in the db", async () => {
    await seedData();
    const response = await request.get("/api/cafes");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.data.length).toBeGreaterThan(0);
    expect(response.body.result.data.length).toBe(10);
    expect(response.body.result.totalItems).toBe(50);
  });

  it("Search should return cafe by its name", async () => {
    await seedData();
    const response = await request.get("/api/cafes?search=balie");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.totalItems).toBe(1);
    expect(response.body.result.data[0].title).toBe("Café De Balie");
  });

  it("Search should return cafe by its name and utilities", async () => {
    await seedData();
    const response = await request.get(
      "/api/cafes?search=water&utilities=0,2,5",
    );

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.totalItems).toBe(1);
    expect(response.body.result.data[0].title).toBe("Café Noord Waterside");
  });
});

describe("GET /api/cafes/:id", () => {
  it("Should return cafe by id in the db", async () => {
    await seedData();
    const response = await request.get("/api/cafes/64b8f5d2dc1b8a1234567802");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result[0].title).toBe("Café Het Paleis");
  });
});
