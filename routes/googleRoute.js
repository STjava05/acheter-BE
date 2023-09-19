const espresse = require('express');
const google = espresse.Router();
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const googleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();



google.use(session({
    secret:process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));

google.use(passport.initialize());
google.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
}
);

passport.deserializeUser((user, done) => {
    done(null, user);

}
);

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

google.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
const redirectUrl = `http://localhost:3000/success?user=${encodeURIComponent(JSON.stringify(req.user))}`;
res.redirect(redirectUrl);

}
);

google.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
const { user } = req;
const token = jwt.sign({ user}, process.env.JWT_SECRET);
const redirectUrl = `http://localhost:3000/success?token=${encodeURIComponent(token)}`;
res.redirect(redirectUrl);

}
);

google.get('/success', (req, res) => {
res.redirect('http://localhost:3000/home');
}
);

module.exports = google;










