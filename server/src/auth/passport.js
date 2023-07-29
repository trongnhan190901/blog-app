const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID:
                '853948015854-jg6ikhve7570cjps5f81bupd7e6nup6p.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id });
            if (!user) {
                const newUser = new User({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                });
                await newUser.save();
                done(null, newUser);
            } else {
                done(null, user);
            }
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
