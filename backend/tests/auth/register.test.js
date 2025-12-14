import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("POST /api/auth/register", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST);
  }, 10000);

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }, 10000);

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe("test@example.com");
  });

  it("should not allow duplicate email", async () => {
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "dup@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "User",
      email: "dup@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(400);
  });
});
