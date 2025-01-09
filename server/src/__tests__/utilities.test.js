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

describe("GET /api/utilities/", () => {
  it("Should return a successful result", async () => {
    await seedData();
    const response = await request.get("/api/utilities");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.length).toBe(17);
    expect(response.body.result[0].index).toBe(0);
    expect(response.body.result[0].value).toBe("indoor-seating");
  });
});
