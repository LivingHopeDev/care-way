"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpSchema = exports.resetPasswordSchema = exports.otpSchema = exports.loginSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    gender: zod_1.z.string(),
    role: zod_1.z.enum(["PROVIDER", "PATIENT"]),
    specialization: zod_1.z.string().optional(),
    location: zod_1.z
        .object({
        street: zod_1.z.string().min(2, "Street is required"),
        city: zod_1.z.string().min(2, "City is required"),
        state: zod_1.z.string().min(2, "State is required"),
        country: zod_1.z.string().min(2, "Country is required"),
    })
        .optional(),
    availability: zod_1.z
        .array(zod_1.z.object({
        day: zod_1.z.string().min(1, "Day is required"),
        start: zod_1.z.string().min(5, "Start time is required"), // e.g., "09:00"
        end: zod_1.z.string().min(5, "End time is required"), // e.g., "17:00"
    }))
        .optional(),
    // operatingHours: z.string().optional(),
    fees: zod_1.z.number().optional(),
    profileImage: zod_1.z.string().optional(),
    documents: zod_1.z.string().optional(),
})
    .superRefine((data, ctx) => {
    if (data.role === "PROVIDER") {
        if (!data.specialization) {
            ctx.addIssue({
                path: ["specialization"],
                message: "Specialization is required.",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        if (!data.location) {
            ctx.addIssue({
                path: ["location"],
                message: "Location is required.",
                code: zod_1.z.ZodIssueCode.custom,
            });
        }
        if (!data.availability) {
            ctx.addIssue({
                path: ["availability"],
                message: "Availability is required.",
                code: zod_1.z.ZodIssueCode.custom,
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
                code: zod_1.z.ZodIssueCode.custom,
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
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string(),
});
exports.otpSchema = zod_1.z.object({
    token: zod_1.z.string(),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    new_password: zod_1.z.string().min(6),
    confirm_password: zod_1.z.string().min(6),
});
exports.resendOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
