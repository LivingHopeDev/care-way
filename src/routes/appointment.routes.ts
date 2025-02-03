import { Router } from "express";
import { authMiddleware, validateData } from "../middlewares";
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
export { appointmentRouter };
