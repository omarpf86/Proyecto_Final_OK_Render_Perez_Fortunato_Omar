import { logger } from '../utils/logger.js'

export const checkRol = (req, res, next) => {
    try {
        const { role } = req.user
        logger.info("from check .rol.js  el rol es: " + role)
        if (role == "admin") {
         next();
        }
        else {
            res.status(403).json({ msg: "No Autorizado" });
        }     
    } catch (error) {
        next(error)    
    }
  
    
};

export const checkRol2 = (req, res, next) => {
    try {
        const { role } = req.user
        logger.info("from check .rol.js  el rol es: " + role)
        if (role == "admin" || role == "premium") {
            next();
        }
        else {
            res.status(403).json({ msg: "No Autorizado" });
        }
    } catch (error) {
        next(error)
    }


};