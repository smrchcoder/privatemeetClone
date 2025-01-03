import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";

const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the token from cookies
    const token = req.cookies.jwt || "";

    // If no token is provided, return unauthorized
    if (!token) {
      res.status(401).json({ message: "Not authorized, no token provided" });
      return;
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "");

    // If the token is invalid, return unauthorized
    if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.id) {
      res.status(401).json({ message: "Not authorized, invalid token" });
      return;
    }

    // Find the user associated with the token
    const user = await User.findById(decodedToken.id);

    // If no user is found, return unauthorized
    if (!user) {
      res.status(404).json({ message: "Not authorized, user not found" });
    }
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors
    console.error("Error in protectRoute middleware:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export default protectRoute;
