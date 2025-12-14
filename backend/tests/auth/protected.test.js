import request from "supertest";
import app from "../../app.js";

describe("GET /api/auth/dashboard", () => {
    it("returns 401 for unauthenticated user", async () => {
        const res = await request(app).get("/api/auth/dashboard");
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Not authorized");
    });
});
