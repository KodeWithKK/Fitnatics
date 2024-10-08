import passport from "passport";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { User } from "../models/user.model.js";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_KEY_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/login-twitter/callback",
    },
    async function (token, tokenSecret, profile, done) {
      try {
        let user = await User.findOne({ twitterId: profile.id });

        if (!user) {
          user = new User({
            provider: "twitter",
            twitterId: profile.id,
            accountSetupRequired: true,
            personalDetails: {
              name: profile.displayName,
              avatar: profile?.photos?.at(0)?.value.replace("_normal", ""),
            },
          });

          await user.save();
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return done(null, { accessToken, refreshToken });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
