import express from "express";
import { login, logout, register, resetPassword } from "../controller/user.controller.js";

const router = express();

router.post("/signup", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword); 
router.get("/logout", logout);

export default router;