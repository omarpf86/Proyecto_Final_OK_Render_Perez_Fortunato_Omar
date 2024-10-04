import { Router } from "express";
import * as controller from "../controllers/mockingProducts.controllers.js";




const router = Router();



router.get("/create", controller.mockingProducts);


export default router;
