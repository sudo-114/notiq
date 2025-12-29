import * as z from "zod";

export const authSchema = z.object({
  email: z.email("Enter a valid email address").trim(),
  pass: z
    .string("Password required")
    .min(8, "Password must be 8 characters long"),
});

export type User = z.infer<typeof authSchema>;
