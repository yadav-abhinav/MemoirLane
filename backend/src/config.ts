import { z } from "zod";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({
  path: [".env.local", ".env"],
});

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  return {
    message: `${issue.path}: ${ctx.defaultError}`,
  };
};

z.setErrorMap(customErrorMap);

cloudinary.config({
  cloud_name: "dibyl2vqo",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
