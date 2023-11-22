import express from "express";
import { forgetpassword, google, resetpassword, signin, signout, signup } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get("/signout",signout);
router.post("/forgetpassword",forgetpassword);
router.post("/resetpassword/:id/:token",resetpassword);
export default router;