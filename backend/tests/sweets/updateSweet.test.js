import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";
import Sweet from "../../models/sweetSchema.js";

describe("PUT /api/sweets/:id", () => {
    let adminCookie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST);
        await User.deleteMany({});
        await Sweet.deleteMany({});

        const hash = await bcrypt.hash("admin123", 10);
        await User.create({
            name: "Admin",
            email: "admin@test.com",
            password: hash,
            role: "admin"
        });

        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "admin@test.com", password: "admin123" });
        adminCookie = res.headers["set-cookie"];
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("updates a sweet", async () => {
        const sweet = await Sweet.create({
            name: "Ladoo",
            category: "Dry",
            price: 5,
            quantity: 10
        });

        const res = await request(app)
            .put(`/api/sweets/${sweet._id}`)
            .set("Cookie", adminCookie)
            .send({ price: 8 });

        expect(res.statusCode).toBe(200);
        expect(res.body.price).toBe(8);
    });
});
