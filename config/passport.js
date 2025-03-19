const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/auth");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/callback", 
            passReqToCallback: true,
            scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.force-ssl"]
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        profilePicture: profile.photos[0].value,
                        accessToken: accessToken,
                    });
                    await user.save();
                } else {
                    user.accessToken = accessToken; 
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// **Session Serialization**
passport.serializeUser((user, done) => {
    done(null, { id: user.id, accessToken: user.accessToken });
});

// **Session Deserialization**
passport.deserializeUser(async (data, done) => {
    try {
        const user = await User.findById(data.id);
        if (!user) return done(null, false);

        user.accessToken = data.accessToken;
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
