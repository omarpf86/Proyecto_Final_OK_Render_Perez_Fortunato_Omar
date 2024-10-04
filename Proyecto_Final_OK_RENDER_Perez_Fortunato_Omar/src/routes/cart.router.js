import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { checkRol } from "../middlewares/check.rol.js";




const router = Router();


router.post("/", [isAuth, checkRol], controller.create);

router.get("/", [isAuth], controller.getAll);

router.get("/:cid", [isAuth], controller.getById);

router.put("/:id", [isAuth, checkRol], controller.update);

router.post("/:cid/products/:id", [isAuth], controller.addProdToCart);

router.put("/:cid/products/:id", [isAuth], controller.updateProdQuantityToCart
);

router.delete("/:cid", [isAuth], controller.clearCart);

router.delete("/:cid/products/:id", [isAuth], controller.removeProdToCart);

router.delete("/delete/:cid", [isAuth, checkRol], controller.deleteCart);

export default router;
