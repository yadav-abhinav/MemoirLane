import express from "express";
import { createNewUser, loginUser } from "../service/auth.service";

const router = express.Router();

router.get("/register", createNewUser);
router.get("/login", loginUser);

export default router;
