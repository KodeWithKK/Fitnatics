import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../models/user.model.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/login-facebook/callback",
      profileFields: ["id", "displayName", "picture.type(large)", "email"],
    },
    async function (req, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
          user = new User({
            provider: "facebook",
            facebookId: profile.id,
            name: profile.displayName,
            avatar: profile.photos?.at(0)?.value,
            accountSetupRequired: true,
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
