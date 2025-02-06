"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppointmentStatus = exports.bookAppointmentSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.bookAppointmentSchema = zod_1.z.object({
    providerId: zod_1.z.string().uuid(),
    availabilityId: zod_1.z.string().uuid(),
    appointmentDate: zod_1.z.string(),
    startTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
    endTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
    reason: zod_1.z.string(),
});
exports.updateAppointmentStatus = zod_1.z.object({
    status: zod_1.z.nativeEnum(client_1.AppointmentStatus, { message: "invalid" }),
});
