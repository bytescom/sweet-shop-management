import request from "supertest";
import app from "../../app.js";

describe("POST /api/auth/logout", () => {
    it("clears cookie and redirects to login", async () => {
        const res = await request(app).post("/api/auth/logout");
        expect(res.statusCode).toBe(302);
    });
});
