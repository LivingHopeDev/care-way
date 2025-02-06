"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const appointment_schema_1 = require("../schema/appointment.schema");
const middlewares_2 = require("../middlewares");
const appointmentRouter = (0, express_1.Router)();
exports.appointmentRouter = appointmentRouter;
appointmentRouter.post("/", (0, middlewares_1.validateData)(appointment_schema_1.bookAppointmentSchema), middlewares_1.authMiddleware, middlewares_2.patientMiddleware, controllers_1.bookAppointment);
appointmentRouter.get("/patient", middlewares_1.authMiddleware, middlewares_2.patientMiddleware, controllers_1.getAppointmentsByPatient);
appointmentRouter.get("/provider", middlewares_1.authMiddleware, middlewares_1.providerMiddleware, controllers_1.getAppointmentsByProvider);
appointmentRouter.get("/:id", middlewares_1.authMiddleware, controllers_1.getAppointmentById); // For all users
appointmentRouter.patch("/:id/cancel", middlewares_1.authMiddleware, middlewares_2.patientMiddleware, controllers_1.cancelAppointment);
appointmentRouter.patch("/:id", (0, middlewares_1.validateData)(appointment_schema_1.updateAppointmentStatus), middlewares_1.authMiddleware, middlewares_1.providerMiddleware, controllers_1.acceptOrRejectAppointment);
// Admin
appointmentRouter.delete("/:id", middlewares_1.authMiddleware, middlewares_1.adminMiddleware, controllers_1.deleteAppointment);
