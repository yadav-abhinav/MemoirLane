import express from "express";
import multer from "multer";
import {
  uploadMediaLocal,
  uploadMediaLink,
  toggleFavouriteMedia,
  getMediaInfo,
} from "../service/media.service";

const upload = multer();
const router = express.Router();

router.post("/upload/local", upload.array("media-upload"), uploadMediaLocal);
router.post("/upload/url", uploadMediaLink);
router.get("/:id", getMediaInfo);
router.patch("/:id/favourite", toggleFavouriteMedia);
router.delete("/:id", toggleFavouriteMedia);
// TODO: router.post("/upload/album", upload.array("media-upload"), uploadMedia);

export default router;
