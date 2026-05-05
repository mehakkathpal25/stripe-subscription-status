import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export type loginType = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})

export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long")
})

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;