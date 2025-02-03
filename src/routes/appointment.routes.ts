import { Router } from "express";
import {
  adminMiddleware,
  authMiddleware,
  providerMiddleware,
  validateData,
} from "../middlewares";
import {
  bookAppointment,
  cancelAppointment,
  deleteAppointment,
  acceptOrRejectAppointment,
  getAppointmentsByPatient,
  getAppointmentsByProvider,
} from "../controllers";
import {
  bookAppointmentSchema,
  updateAppointmentStatus,
} from "../schema/appointment.schema";
import { patientMiddleware } from "../middlewares";
const appointmentRouter: Router = Router();

appointmentRouter.post(
  "/",
  validateData(bookAppointmentSchema),
  authMiddleware,
  patientMiddleware,
  bookAppointment
);
appointmentRouter.get(
  "/patient",
  authMiddleware,
  patientMiddleware,
  getAppointmentsByPatient
);

appointmentRouter.get(
  "/provider",
  authMiddleware,
  providerMiddleware,
  getAppointmentsByProvider
);
appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  patientMiddleware,
  cancelAppointment
);

appointmentRouter.patch(
  "/:id",
  validateData(updateAppointmentStatus),
  authMiddleware,
  providerMiddleware,
  acceptOrRejectAppointment
);

// Admin
appointmentRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteAppointment
);
export { appointmentRouter };
