import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("./public"));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: "GET,POST,PUT,DELETE",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true, // Set to 'true' in production,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// importing strategies
import "./services/google.strategy.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV == "production") {
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
