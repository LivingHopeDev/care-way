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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.getAppointmentById = exports.getAppointmentsByProvider = exports.acceptOrRejectAppointment = exports.getAppointmentsByPatient = exports.cancelAppointment = exports.bookAppointment = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const appointmentService = new services_1.AppointmentService();
exports.bookAppointment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.patient.id;
    const appointment = yield appointmentService.bookAppointment(patientId, req.body);
    res.status(201).json({ status: "success", data: appointment });
}));
exports.cancelAppointment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.patient.id;
    const appointmentId = req.params.id;
    if (!appointmentId) {
        throw new middlewares_1.BadRequest("Appointment ID is required");
    }
    const appointment = yield appointmentService.cancelAppointment(appointmentId, patientId);
    res.status(200).json({ status: "success", data: appointment });
}));
exports.getAppointmentsByPatient = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.patient.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        orderBy: orderBy || "createdAt",
        orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const appointment = yield appointmentService.getAppointmentsByPatient(patientId, query);
    res.status(200).json({ status: "success", data: appointment });
}));
// For providers
exports.acceptOrRejectAppointment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.provider.id;
    const appointmentId = req.params.id;
    if (!appointmentId) {
        throw new middlewares_1.BadRequest("Appointment ID is required");
    }
    const { status } = req.body;
    const appointment = yield appointmentService.acceptOrRejectAppointment(appointmentId, providerId, status);
    res.status(200).json({ status: "success", data: appointment });
}));
exports.getAppointmentsByProvider = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.provider.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        orderBy: orderBy || "createdAt",
        orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const appointment = yield appointmentService.getAppointmentsByProvider(providerId, query);
    res.status(200).json({ status: "success", data: appointment });
}));
exports.getAppointmentById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    if (!appointmentId) {
        return res.status(400).json({
            status_code: "400",
            message: "Appointment ID is required",
        });
    }
    const appointment = yield appointmentService.getAppointmentById(appointmentId, userId, userRole);
    return res.status(200).json({
        status: "success",
        data: appointment,
    });
}));
// For Admins
exports.deleteAppointment = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = req.params.id;
    const appointment = yield appointmentService.deleteAppointment(appointmentId);
    res.status(200).json({ status: "success", data: appointment });
}));
