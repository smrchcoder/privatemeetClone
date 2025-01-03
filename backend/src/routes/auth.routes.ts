import express, { Router } from "express";
import {
  signup,
  login,
  logout,
  updateProfilePic,
} from "../controllers/auth.controller";
import protectRoute from "../middlewares/auth.middleware";

const authRouter: Router = express.Router();

// Define the signup route
authRouter.post("/signup", signup);

//Define the login route

authRouter.post("/login", login);

//Define the logout route

authRouter.post("/logout", logout);

authRouter.put("/update-profile", protectRoute, updateProfilePic);

export default authRouter;
