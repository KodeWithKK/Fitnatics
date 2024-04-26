import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// import homeRouter from "./routes/home.routes.js";
// import authRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
dotenv.config({ path: "./.env" });

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  method: ["GET", "POST"],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({ data: "API is Working" });
});

// app.use("/", homeRouter);
// app.use("/u", authRouter);

// Centralized error-handling middleware
// app.use((err, req, res, next) => {
//   res.status(500).json({ error: "Internal Server Error", message: err });
// });

export { app };
