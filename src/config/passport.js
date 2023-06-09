import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
passport.use(
    new LocalStrategy(
        {usernameField: 'email'},
        async (email, password, done) => {
            // Match Email's User
            const user = await User.findOne({email}); 
            if (!user) {
                return done(null, false, {message: 'Not User found.'});
            } else {
                // Match Password's User
                const match = await user.matchPassword(password);
                if(match) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect Password.'});
                }
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    });
});
