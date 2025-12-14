import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";
import Sweet from "../../models/sweetSchema.js";

describe("POST /api/sweets/:id/purchase", () => {
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

        const res = await request(app)
            .post("/api/auth/login")
            .send({ email: "user@test.com", password: "user123" });
        userCookie = res.headers["set-cookie"];
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("decreases sweet quantity", async () => {
        const sweet = await Sweet.create({
            name: "Rasgulla",
            category: "Milk",
            price: 10,
            quantity: 3
        });

        const res = await request(app)
            .post(`/api/sweets/${sweet._id}/purchase`)
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(2);
    });
});
