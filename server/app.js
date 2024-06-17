import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import getDataRouter from "./routes/getData.routes.js";
import addDataRouter from "./routes/addData.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";

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

const NODE_ENV = process.env.NODE_ENV;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === "dev" ? false : true,
      sameSite: NODE_ENV === "dev" ? false : true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// importing strategies
import "./services/google.strategy.js";
import "./services/facebook.strategy.js";
import "./services/twitter.strategy.js";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/get-data", getDataRouter);

/* DEVELOPMENT ROUTES */
if (process.env.NODE_ENV === "dev") {
  app.use("/api/v1/add-data", addDataRouter);
}

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  return res.status(500).json(
    new ApiResponse(
      500,
      {},
      {
        error: {
          title: "Internal Server Error!",
          message:
            process.env.NODE_ENV == "dev"
              ? err?.message ?? "Something went wrong"
              : "Something went wrong",
        },
      }
    )
  );
});

export { app };
