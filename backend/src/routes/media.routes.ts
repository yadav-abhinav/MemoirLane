import express from "express";
import multer from "multer";
import { uploadMedia } from "../service/media.service";

const upload = multer();
const router = express.Router();

router.post("/upload", upload.single("media-upload"), uploadMedia);
// router.get("/", uploadMedia);

export default router;
