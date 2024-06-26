import express from "express";
import {
  createNewUser,
  loginUser,
  refreshAccessToken,
} from "../service/auth.service";

const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/refresh", refreshAccessToken);

export default router;
