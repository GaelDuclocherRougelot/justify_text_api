import { app, server } from "@/index";
import generateToken from "@/utils/generateToken";
import fs from "fs";
import path from "path";
import request from "supertest";

describe("justifyController", () => {
  let token: string;

  beforeAll(() => {
    token = generateToken("foo@bar.com");
  });

  afterAll((done) => {
    server.close(done);
  });

  const readFile = (fileName: string) => {
    return fs.readFileSync(path.join(__dirname, fileName), "utf-8").trim();
  };

  it("should return justified text", async () => {
    const inputText = readFile("./input1.txt");
    const expectedOutput = readFile("./expectedOutput1.txt");
  
    const response = await request(app)
      .post("/api/justify")
      .set("Content-Type", "text/plain")
      .set("Authorization", `Bearer ${token}`)
      .send(inputText);

    expect(response.text).not.toContain("\n\n");
    expect(response.text.replace(/\s+/g, " ").trim()).toBe(
      expectedOutput.replace(/\s+/g, " ").trim()
    );
    expect(response.status).toBe(200);
  });

});
