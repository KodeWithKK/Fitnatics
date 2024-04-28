import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public"));
app.use(cookieParser());
dotenv.config({ path: "./.env" });

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  method: ["GET", "POST"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// Centralized error-handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: "Internal Server Error", message: err });
// });

export { app };
