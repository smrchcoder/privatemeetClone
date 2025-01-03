import express from "express";
import authRouter from "./routes/auth.routes";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import cookieParser = require("cookie-parser");
dotenv.config();
const app = express();

const PORT = process.env.PORT;
//extract json data from body , acts as a middle ware
// Add this middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//alllows to parse cookies
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("port is active" + PORT);
  connectDb();
});
