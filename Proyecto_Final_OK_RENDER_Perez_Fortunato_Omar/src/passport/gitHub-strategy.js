import * as services from '../services/user.services.js';
import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import 'dotenv/config';

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
     console.log(profile);
    const email = profile._json.email;
    const user = await services.getUser(email);
    if (user) return done(null, user);
    const name = profile._json.name || "Unknown"
    console.log("el nombre es:" + name)
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || 'Unknown';
    let lastName = '';
    if (nameParts.length > 1) {
        lastName = nameParts.slice(1).join(' ');
    } else {
        lastName = 'Unknown';
    }
    const newUser = ({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: " ",
        isGithub: true, 
    });
    const newUser1=await services.register(newUser)
    return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});


