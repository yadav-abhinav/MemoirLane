import express from "express";
import {
  createNewUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../service/auth.service";
import verifyJWT from "../middleware/jwt";

const router = express.Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.get("/refresh", refreshAccessToken);

export default router;
