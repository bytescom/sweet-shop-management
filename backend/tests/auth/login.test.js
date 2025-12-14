import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import User from "../../models/userSchema.js";

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST);
    await User.create({
      name: "Login User",
      email: "login@test.com",
      password: "password123"
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should login user with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });

  it("should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "wrongpass"
      });

    expect(res.statusCode).toBe(401);
  });
});
