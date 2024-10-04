import { Router } from "express";



const router = Router();
import {
    current,
    logout,
    visit,
    infoSession,
    registerPassportLocal,
    loginPassportLocal,
    update,
    deleteUser,
    showInactiveUsers,
    deleteInactiveUsers,
    getAll
} from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import { checkRol } from "../middlewares/check.rol.js";
import { logger } from "../utils/logger.js";



router.post('/register', passport.authenticate('register'), (req, res, next) => {
    logger.http(`user.router.js - POST /register - User: ${req.user.email}`);
    next();}, registerPassportLocal);
    
router.post("/login", passport.authenticate('login'), (req, res, next) => {
    logger.http(`user.router.js - POST /register - User: ${req.user.email}`);
    next();}, loginPassportLocal);

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] })) 

router.get('/access', passport.authenticate('github', {
    failureRedirect: '/api/users/register', //duda
    successRedirect: '/api/views/cart',
    passReqToCallback: true
}));

router.put("/roleChanged/:id/", isAuth, update);

router.get("/", [isAuth, checkRol ], getAll);
router.get('/current', isAuth, current)
router.get('/private', isAuth, (req, res) => res.json({ msg: 'Ruta PRIVADA' }))
router.get("/info",validateLogin, infoSession);
router.get("/secret-endpoint",validateLogin, visit);
router.get('/inactive', [isAuth, checkRol], showInactiveUsers)

router.delete("/delete/:id", [isAuth, checkRol], deleteUser);

router.delete("/inactiveDelete", [isAuth, checkRol], deleteInactiveUsers);

router.post("/logout", logout);

export default router;