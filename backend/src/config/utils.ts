import jwt from "jsonwebtoken";
import { Response } from "express";

const generateJsonWebToken = (userId: object, res: Response): void => {
  const secret = process.env.JWT_SECRET || "someValidData";

  // Generate the token
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "7d" });

  // Set the token as a cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Ensures the cookie is accessible only by the web server
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Helps prevent CSRF attacks
  });
};

export default generateJsonWebToken;
