import { app, server } from "@/index";
import { resetTokenUsage } from "@/middlewares/rateLimiter";
import generateToken from "@/utils/generateToken";
import request from "supertest";

describe("Rate Limiter Middleware", () => {
  let validToken: string;

  beforeAll(() => {
    validToken = `Bearer ${generateToken("foo@bar.com")}`;
  });

  afterEach(() => {
    resetTokenUsage();
  });

  afterAll((done) => {
    server.close(done);
  });

  const largeText = "word ".repeat(20000); // Text with 20,000 words

  it("should allow requests under the limit", async () => {
    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", validToken)
      .send(largeText); // First request (20,000 words)

    expect(res.status).toBe(200);
  });

  it("should block requests exceeding the limit", async () => {
    // First request under limit (20,000 words)
    await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", validToken)
      .send(largeText);

    // Second request under limit (another 20,000 words)
    await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", validToken)
      .send(largeText);

    // Third request under limit (another 20,000 words)
    await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", validToken)
      .send(largeText);

    // Fourth request exceeds the limit (total of 80,000 words so far)
    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", validToken)
      .send(largeText); // This request would push the word count to 100,000

    expect(res.status).toBe(402);
    expect(res.body.message).toBe("Payment Required");
  });

  it("should correctly reset token usage for new tokens", async () => {
    const newToken = `Bearer ${generateToken("foo@bar.com")}`;
    resetTokenUsage();
    // First request for a new token (20,000 words)
    const res = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", newToken)
      .send(largeText);

    expect(res.status).toBe(200);
  });

});
