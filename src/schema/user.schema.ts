import { optional, z } from "zod";

export const PatientSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string(),
});

export const ProviderSignUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.string(),
  specialization: z.string(),
  bus_stop: z.string(),
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  availability: z
    .array(
      z.object({
        day: z.string().min(1, "Day is required"),
        start: z.string().min(5, "Start time is required"),
        end: z.string().min(5, "End time is required"),
      })
    )
    .optional(),
  fees: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});
export const otpSchema = z.object({
  token: z.string(),
});
export const resetPasswordSchema = z.object({
  token: z.string(),
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
});
export const resendOtpSchema = z.object({
  email: z.string().email(),
});
