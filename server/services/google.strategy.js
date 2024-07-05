import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/login-google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
        let googleUser = await User.findOne({ googleId: profile.id });
        let otherUser = await User.findOne({
          email: profile.emails?.at(0)?.value,
        });

        let error, accessToken, refreshToken;

        if (!googleUser && otherUser) {
          error = {
            title: "User already exists!",
            message: `An account with this email already created with ${
              otherUser.provider == "local"
                ? "email and password"
                : otherUser.provider
            }`,
          };
        }

        if (!googleUser && !otherUser) {
          googleUser = new User({
            provider: "google",
            googleId: profile.id,
            email: profile.emails?.at(0)?.value,
            accountSetupRequired: true,
            personalDetails: {
              name: profile.displayName,
              avatar: profile?.photos?.at(0)?.value.replace(/s\d+-c/, "s400-c"),
            },
          });

          await googleUser.save();
        }

        if (googleUser) {
          accessToken = googleUser.generateAccessToken();
          refreshToken = googleUser.generateRefreshToken();
        }

        return done(null, { accessToken, refreshToken, error });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
