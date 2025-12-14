import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../../models/userSchema.js";
import Sweet from "../../models/sweetSchema.js";

describe("POST /api/sweets/:id/restock", () => {
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

    it("admin can restock sweet", async () => {
        const sweet = await Sweet.create({
            name: "Peda",
            category: "Milk",
            price: 8,
            quantity: 5
        });

        const res = await request(app)
            .post(`/api/sweets/${sweet._id}/restock`)
            .set("Cookie", adminCookie)
            .send({ amount: 10 });

        expect(res.statusCode).toBe(200);
        expect(res.body.quantity).toBe(15);
    });
});
