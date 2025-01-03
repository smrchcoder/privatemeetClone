import express, { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const authRouter: Router = express.Router();

// Define the signup route
authRouter.post("/signup", signup);

//Define the login route

authRouter.post("/login", login);

//Define the logout route

authRouter.post("/logout", logout);

export default authRouter;
