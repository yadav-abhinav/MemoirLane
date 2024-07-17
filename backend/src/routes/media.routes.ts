import express from "express";
import multer from "multer";
import { uploadMediaLocal, uploadMediaLink } from "../service/media.service";

const upload = multer();
const router = express.Router();

router.post("/upload/local", upload.array("media-upload"), uploadMediaLocal);
router.post("/upload/url", uploadMediaLink);
// TODO: router.post("/upload/album", upload.array("media-upload"), uploadMedia);
// TODO: Add favourite

export default router;
