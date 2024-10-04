import { Router } from "express";
import * as controller from "../controllers/logger.prueba.js";


const router = Router();



router.get("/", controller.prueba);


export default router;
