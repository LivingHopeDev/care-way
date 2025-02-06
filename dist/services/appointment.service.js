"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
const paginate_1 = require("../utils/paginate");
class AppointmentService {
    // For Patients
    bookAppointment(patientId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId, availabilityId, appointmentDate, startTime, endTime, reason, } = payload;
            const startDateTime = new Date(`${appointmentDate}T${startTime}:00.000Z`);
            const endDateTime = new Date(`${appointmentDate}T${endTime}:00.000Z`);
            const availability = yield __1.prismaClient.availability.findUnique({
                where: { id: availabilityId, providerId },
            });
            if (!availability)
                throw new middlewares_1.ResourceNotFound("Availability not found");
            const overlappingAppointment = yield __1.prismaClient.appointment.findFirst({
                where: {
                    providerId,
                    appointmentDate: startDateTime,
                    startTime: startDateTime,
                    endTime: endDateTime,
                },
            });
            if (overlappingAppointment) {
                throw new middlewares_1.BadRequest("Appointment slot already booked.");
            }
            return yield __1.prismaClient.appointment.create({
                data: {
                    providerId,
                    patientId,
                    availabilityId,
                    appointmentDate: startDateTime,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    reason,
                },
            });
        });
    }
    cancelAppointment(appointmentId, patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield __1.prismaClient.appointment.findUnique({
                where: { id: appointmentId, patientId },
            });
            if (!appointment)
                throw new middlewares_1.ResourceNotFound("Appointment not found");
            yield __1.prismaClient.appointment.update({
                where: { id: appointmentId },
                data: {
                    status: "CANCELLED",
                },
            });
            return { message: "Appointment cancelled successfully" };
        });
    }
    getAppointmentsByPatient(patientId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, paginate_1.paginate)(__1.prismaClient.appointment, {
                where: { patientId },
                include: { availability: true, provider: true },
                page: Number(query.page),
                limit: Number(query.limit),
                orderBy: query.orderBy || "createdAt",
                orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
            });
        });
    }
    getAppointmentsByProvider(providerId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, paginate_1.paginate)(__1.prismaClient.appointment, {
                where: { providerId },
                include: { availability: true, patient: true },
                page: Number(query.page),
                limit: Number(query.limit),
                orderBy: query.orderBy || "createdAt",
                orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
            });
        });
    }
    getAppointmentById(appointmentId, userId, userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userRole === "ADMIN") {
                const appointment = yield __1.prismaClient.appointment.findUnique({
                    where: { id: appointmentId },
                    include: {
                        availability: true,
                        provider: true,
                        patient: true,
                    },
                });
                if (!appointment) {
                    throw new middlewares_1.ResourceNotFound("Appointment not found");
                }
                return appointment;
            }
            // For providers and patients
            const userRecord = yield (userRole === "PROVIDER"
                ? __1.prismaClient.provider.findUnique({ where: { userId } })
                : __1.prismaClient.patient.findUnique({ where: { userId } }));
            if (!userRecord) {
                throw new middlewares_1.ResourceNotFound("User record not found");
            }
            const appointment = yield __1.prismaClient.appointment.findUnique({
                where: { id: appointmentId },
                include: {
                    availability: true,
                    provider: true,
                    patient: true,
                },
            });
            if (!appointment) {
                throw new middlewares_1.ResourceNotFound("Appointment not found");
            }
            if (userRole === "PROVIDER") {
                if (appointment.providerId !== userRecord.id) {
                    throw new middlewares_1.BadRequest("Unauthorized access to appointment");
                }
            }
            else if (userRole === "PATIENT") {
                if (appointment.patientId !== userRecord.id) {
                    throw new middlewares_1.BadRequest("Unauthorized access to appointment");
                }
            }
            else {
                throw new middlewares_1.BadRequest("Invalid user role");
            }
            return appointment;
        });
    }
    // For Providers
    acceptOrRejectAppointment(appointmentId, providerId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield __1.prismaClient.appointment.findUnique({
                where: { id: appointmentId, providerId },
            });
            if (!appointment)
                throw new middlewares_1.ResourceNotFound("Appointment not found");
            yield __1.prismaClient.appointment.update({
                where: { id: appointmentId },
                data: {
                    status,
                },
            });
            return {
                message: `Appointment ${status.toLowerCase()} successfully`,
            };
        });
    }
    // Delete an appointment (ADMIN Privilege)
    deleteAppointment(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield __1.prismaClient.appointment.findUnique({
                where: { id: appointmentId },
            });
            if (!appointment)
                throw new middlewares_1.ResourceNotFound("Appointment not found");
            yield __1.prismaClient.appointment.delete({ where: { id: appointmentId } });
            return { message: "Appointment deleted successfully" };
        });
    }
}
exports.AppointmentService = AppointmentService;
