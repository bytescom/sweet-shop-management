import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";

describe("POST /api/sweets", () => {
    let adminCookie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST);
        await User.deleteMany({});

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

    it("creates a new sweet", async () => {
        const res = await request(app)
            .post("/api/sweets")
            .set("Cookie", adminCookie)
            .send({
                name: "Gulab Jamun",
                category: "Milk",
                price: 10,
                quantity: 20
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Gulab Jamun");
    });
});
