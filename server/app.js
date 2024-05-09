import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public"));
app.use(cookieParser());

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
app.use((err, req, res, next) => {
  if (process.env.PRODUCTION == "true") {
    return res.status(500).json({
      error: {
        title: "Internal Server Error",
        message: "Something went wrong",
      },
    });
  }

  return res.status(500).json({ error: "Internal Server Error", message: err });
});

export { app };
