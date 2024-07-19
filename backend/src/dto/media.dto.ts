import z from "zod";

export const UploadImageUrlDto = z.object({
  src: z.string({ message: "URL is required" }).url(),
});
