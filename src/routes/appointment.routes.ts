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

// For provider
appointmentRouter.patch(
  "/:id",
  validateData(updateAppointmentStatus),
  authMiddleware,
  providerMiddleware,
  acceptOrRejectAppointment
);

appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  patientMiddleware,
  cancelAppointment
);

// Admin
appointmentRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteAppointment
);
export { appointmentRouter };
