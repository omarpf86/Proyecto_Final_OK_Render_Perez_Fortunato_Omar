import { Router } from 'express';
import * as controller from "../controllers/ticket.controller.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = Router();

router.post('/purchase', [isAuth], controller.generateTicket)

export default router;