import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";
import Sweet from "../../models/sweetSchema.js";

describe("GET /api/sweets/search", () => {
    let userCookie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST);
        await User.deleteMany({});
        await Sweet.deleteMany({});

        const hash = await bcrypt.hash("user123", 10);
        await User.create({
            name: "User",
            email: "user@test.com",
            password: hash,
            role: "user"
        });

        await Sweet.create([
            { name: "Gulab Jamun", category: "Milk", price: 25, quantity: 100 }
        ]);

        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "user@test.com", password: "user123" });
        userCookie = res.headers["set-cookie"];
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("searches sweets by name", async () => {
        const res = await request(app)
            .get("/api/sweets/search?name=gulab")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
    });
});
