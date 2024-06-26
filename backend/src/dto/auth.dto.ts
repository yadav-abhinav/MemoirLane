import z from "zod";

export const CreateUserDto = z.object({
  email: z.string({ message: "Email is required" }).email(),
  name: z.string(),
  password: z.string().min(8),
});

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
