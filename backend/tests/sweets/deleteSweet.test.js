import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";
import Sweet from "../../models/sweetSchema.js";

describe("DELETE /api/sweets/:id", () => {
    let adminCookie;
    let userCookie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST);
        await User.deleteMany({});
        await Sweet.deleteMany({});

        const hash = await bcrypt.hash("password123", 10);

        await User.create({
            name: "Admin",
            email: "admin@test.com",
            password: hash,
            role: "admin"
        });

        await User.create({
            name: "User",
            email: "user@test.com",
            password: hash,
            role: "user"
        });

        const adminRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "admin@test.com", password: "password123" });
        adminCookie = adminRes.headers["set-cookie"];

        const userRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "user@test.com", password: "password123" });
        userCookie = userRes.headers["set-cookie"];
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("allows admin to delete sweet", async () => {
        const sweet = await Sweet.create({
            name: "Barfi",
            category: "Milk",
            price: 12,
            quantity: 5
        });

        const res = await request(app)
            .delete(`/api/sweets/${sweet._id}`)
            .set("Cookie", adminCookie);

        expect(res.statusCode).toBe(200);
    });

    it("blocks normal user", async () => {
        const sweet = await Sweet.create({
            name: "Halwa",
            category: "Wheat",
            price: 15,
            quantity: 5
        });

        const res = await request(app)
            .delete(`/api/sweets/${sweet._id}`)
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(403);
    });
});
