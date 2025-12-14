import 'dotenv/config';
import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import User from "../../models/userSchema.js";
import bcrypt from "bcryptjs";

describe("Admin authorization", () => {
    let adminCookie;
    let userCookie;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL_TEST);

        const hash = await bcrypt.hash("123456", 10);

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
            .send({ email: "admin@test.com", password: "123456" });

        adminCookie = adminRes.headers["set-cookie"];

        const userRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "user@test.com", password: "123456" });

        userCookie = userRes.headers["set-cookie"];
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("allows admin access", async () => {
        const res = await request(app)
            .get("/api/admin")
            .set("Cookie", adminCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Admin access granted");
    });

    it("blocks non-admin users", async () => {
        const res = await request(app)
            .get("/api/admin")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe("Admin access only");
    });
});
