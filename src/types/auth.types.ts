import { z } from "zod";
const baseRegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const registerFormSchema = baseRegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export const userCreateSchema = baseRegisterSchema.omit({
  confirmPassword: true,
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;

export const signInSchema = z.object({
  username: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type LoginInput = z.infer<typeof signInSchema>;
