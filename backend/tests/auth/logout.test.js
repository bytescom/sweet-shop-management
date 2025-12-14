import request from "supertest";
import app from "../../app.js";

describe("POST /api/auth/logout", () => {
    it("clears cookie and returns success", async () => {
        const res = await request(app).post("/api/auth/logout");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Logged out successfully");
    });
});
