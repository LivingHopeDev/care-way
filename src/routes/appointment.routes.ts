import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import { bookAppointment, cancelAppointment } from "../controllers";
import { bookAppointmentSchema } from "../schema/appointment.schema";
import { patientMiddleware } from "../middlewares";
const appointmentRouter: Router = Router();

appointmentRouter.post(
  "/",
  validateData(bookAppointmentSchema),
  authMiddleware,
  patientMiddleware,
  bookAppointment
);

appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  patientMiddleware,
  cancelAppointment
);

// Admin
appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  adminMiddleware,
  cancelAppointment
);
export { appointmentRouter };
