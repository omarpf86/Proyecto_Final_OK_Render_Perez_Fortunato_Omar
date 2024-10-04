import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";



const router = Router();

router.get("/", (req, res) => {
    res.render('homepageproducts')
})



export default router;
