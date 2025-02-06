"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAvailabilitySchema = exports.createAvailabilitySchema = void 0;
const zod_1 = require("zod");
const timeSlotSchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    startTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
    endTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
});
exports.createAvailabilitySchema = zod_1.z.object({
    timeSlots: zod_1.z
        .array(timeSlotSchema)
        .min(1, "At least one time slot is required")
        .max(7, "You can create a maximum of 7 time slots at once"),
});
exports.updateAvailabilitySchema = zod_1.z.object({
    date: zod_1.z.string().optional(), // Optional since the provider might only want to update time
    startTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:mm")
        .optional(),
    endTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:mm")
        .optional(),
});
