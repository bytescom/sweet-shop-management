import 'dotenv/config';
import mongoose from "mongoose";
import connectDB from "../config/db.js";

describe("Database connection", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to MongoDB", async () => {
    await connectDB();
    expect(mongoose.connection.readyState).toBe(1);
  });
});
