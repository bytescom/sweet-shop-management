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

        // Create test sweets for all search scenarios
        await Sweet.create([
            { name: "Gulab Jamun", category: "Milk", price: 10, quantity: 5 },
            { name: "Kaju Katli", category: "Dry", price: 20, quantity: 10 },
            { name: "Cheap Sweet", category: "Milk", price: 5, quantity: 5 },
            { name: "Expensive Sweet", category: "Dry", price: 50, quantity: 5 },
            { name: "Special Barfi", category: "Milk", price: 15, quantity: 5 }
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

    // Search by Name
    it("returns sweets matching name", async () => {
        const res = await request(app)
            .get("/api/sweets/search?name=gulab")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].name).toMatch(/gulab/i);
    });

    // Filter by Category
    it("filters sweets by category", async () => {
        const res = await request(app)
            .get("/api/sweets/search?category=Dry")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2); // Kaju Katli & Expensive Sweet
        expect(res.body.every(s => s.category === "Dry")).toBe(true);
    });

    // 3Filter by Price Range
    it("filters sweets within price range", async () => {
        const res = await request(app)
            .get("/api/sweets/search?minPrice=1&maxPrice=10")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.every(s => s.price <= 10)).toBe(true);
    });

    // Combined Filters (Name + Category + Price)
    it("applies multiple filters together", async () => {
        const res = await request(app)
            .get("/api/sweets/search?name=barfi&category=Milk&maxPrice=20")
            .set("Cookie", userCookie);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("Special Barfi");
    });

    // Unauthenticated request
    it("rejects unauthenticated search", async () => {
        const res = await request(app).get("/api/sweets/search?name=gulab");

        expect(res.statusCode).toBe(401);
    });
});
