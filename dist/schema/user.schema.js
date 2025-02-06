"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpSchema = exports.resetPasswordSchema = exports.otpSchema = exports.loginSchema = exports.ProviderSignUpSchema = exports.PatientSignUpSchema = void 0;
const zod_1 = require("zod");
exports.PatientSignUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    gender: zod_1.z.string(),
});
exports.ProviderSignUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 characters"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    gender: zod_1.z.string(),
    specialization: zod_1.z.string(),
    bus_stop: zod_1.z.string(),
    street: zod_1.z.string().min(2, "Street is required"),
    city: zod_1.z.string().min(2, "City is required"),
    state: zod_1.z.string().min(2, "State is required"),
    country: zod_1.z.string().min(2, "Country is required"),
    fees: zod_1.z.string(),
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
