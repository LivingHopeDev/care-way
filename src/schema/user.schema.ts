import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.string(),
    role: z.enum(["PROVIDER", "PATIENT"]),
    specialization: z.string().optional(),
    location: z
      .object({
        street: z.string().min(2, "Street is required"),
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        country: z.string().min(2, "Country is required"),
      })
      .optional(),
    availability: z
      .array(
        z.object({
          day: z.string().min(1, "Day is required"),
          start: z.string().min(5, "Start time is required"), // e.g., "09:00"
          end: z.string().min(5, "End time is required"), // e.g., "17:00"
        })
      )
      .optional(),
    // operatingHours: z.string().optional(),
    fees: z.number().optional(),
    profileImage: z.string().optional(),
    documents: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "PROVIDER") {
      if (!data.specialization) {
        ctx.addIssue({
          path: ["specialization"],
          message: "Specialization is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.location) {
        ctx.addIssue({
          path: ["location"],
          message: "Location is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.availability) {
        ctx.addIssue({
          path: ["availability"],
          message: "Availability is required.",
          code: z.ZodIssueCode.custom,
        });
      }
      // if (!data.operatingHours) {
      //   ctx.addIssue({
      //     path: ["operatingHours"],
      //     message: "Operating hours are required.",
      //     code: z.ZodIssueCode.custom,
      //   });
      // }
      if (!data.fees) {
        ctx.addIssue({
          path: ["fees"],
          message: "Consultation fees are required.",
          code: z.ZodIssueCode.custom,
        });
      }
      // if (!data.documents) {
      //   ctx.addIssue({
      //     path: ["documents"],
      //     message: "Supporting documents are required.",
      //     code: z.ZodIssueCode.custom,
      //   });
      // }
    }
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
