import express from "express";
import { getUserMedia } from "../service/user.service";

const router = express.Router();

router.get("/media", getUserMedia);

export default router;
