import * as services from '../services/user.services.js';
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { logger } from '../utils/logger.js'

const strategyConfig = {
    usernameField: 'email',
    passportField: 'password',
    passReqToCallback: true
};

const signUp = async (req, email, password, done) => {
    try {
        const user = await services.getUser(email);
        if (user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const userLogin = await services.login({email, password} ); 
        if (!userLogin) {
            req.session.destroy()
            return done(null, false, { message: 'Alto ahí Rufián ⛔' });
        }
       userLogin.lastConnection = new Date();
       await userLogin.save();
        return done(null, userLogin)
    } catch (error) {
        console.log(error)
        return done(error)
    }
};

const signUpStrategy = new LocalStrategy(strategyConfig, signUp);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('register', signUpStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id);
        logger.info("from local-strategy.js, la deserialización se lleva a cabo" , user)
        return done(null, user);
    } catch (error) {
        done(error)
    }
});


