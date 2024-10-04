import { Router } from "express";

const router = Router();

router.get("/cart", (req, res) => {
    res.render("cart");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});



export default router;