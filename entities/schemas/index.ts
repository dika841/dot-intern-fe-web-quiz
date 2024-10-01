import { z } from "zod";

export const VSLogin = z.object({
  email: z
    .string({ required_error: "Email Cannot Be Empty" })
    .email({
      message: "Email is not valid",
    })
    .min(1, {
      message: "Email Cannot Be empty",
    }),
  password: z.string({ required_error: "Password Cannot Be empty" }).min(1, {
    message: "Password atleast have 4 character",
  }),
});

export const VSRegister = z.object({
  name: z
    .string({ required_error: "Username is required" })
    .min(1, { message: "Username Cannot Be Empty" }),
  email: z
    .string({ required_error: "Email Cannot Be Empty" })
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Cannot Be Empty" })
    .min(8, { message: "Password must be at least 8 characters" }),
});
