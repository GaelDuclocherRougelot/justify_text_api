import { app, server } from "@/index";
import { authenticateToken } from "@/middlewares/auth";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import request from "supertest";

jest.mock("jsonwebtoken");
dotenv.config();


describe("auth middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    nextFunction = jest.fn();
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should retrun 400 if the email is invalid", async () => {
    const email = "invalid-email";

    const response = await request(app).post("/api/token").send({ email });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({ error: "Invalid email" });
  });

  it("should return 403 if the token is invalid", () => {
    const token = "invalid_token";
    (jwt.verify as jest.Mock).mockImplementation((_, __, cb) =>
      cb(new Error("Token is invalid"))
    );

    if (mockRequest.headers !== undefined) {
      mockRequest.headers["authorization"] = `Bearer ${token}`;
    }

    authenticateToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith("Forbidden");
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", () => {
    authenticateToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith("Unauthorized");
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should call next() if the token is valid", () => {
    const token = "valid_token";
    const user = { email: "test@example.com" };
    (jwt.verify as jest.Mock).mockImplementation((_, __, cb) => cb(null, user)); // Mocking jwt.verify

    if (mockRequest.headers !== undefined) {
      mockRequest.headers["authorization"] = `Bearer ${token}`;
    }

    authenticateToken(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalled();
    expect(mockRequest.body.user).toEqual(user);
  });
});
