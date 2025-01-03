import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import generateJsonWebToken from "../config/utils";
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, password, email } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "All user details are required" });
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password length should be more than 6" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ email, name, password: hashedPassword });
    if (newUser) {
      generateJsonWebToken(newUser._id, res);
      newUser.save();
      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
      });
      return;
    } else {
      res.status(400).json({ message: "User details are invalid" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Please enter the credentials" });
      return;
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User with this email does not exist" });
      return;
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    generateJsonWebToken(user._id, res);
    // Respond with the token and user information
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name }, // Adjust as per your user model
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error: " + error });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User sucessfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error: " + error });
  }
};
