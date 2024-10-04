import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { checkRol2 } from "../middlewares/check.rol.js";
import { isAuth } from "../middlewares/isAuth.js";


const router = Router();


router.get("/", [isAuth], controller.getAll);

router.get("/:id", [isAuth], controller.getById);

router.post("/", [isAuth,checkRol2], controller.create);

router.put("/:id", [isAuth, checkRol2], controller.update);

router.delete("/:id",[isAuth, checkRol2], controller.remove);

export default router;


