import { z } from 'zod';

// Environment variables schema
export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().url().optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
});

// Common data schemas
export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).max(100);

// User schema example
export const userSchema = z.object({
  id: z.string().uuid(),
  email: emailSchema,
  name: z.string().min(1).max(100),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// API response schema
export const apiResponseSchema = <T>(dataSchema: z.ZodSchema<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// Export types
export type User = z.infer<typeof userSchema>;
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<T>>>;
