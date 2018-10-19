'use strict;'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.generatePassport = () => {
    const googleCredentials = require('../../credentials/google.json'); 

    let passport = require('passport');

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0]
    },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
    return passport;
}