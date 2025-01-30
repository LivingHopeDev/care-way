import { Router } from "express";
import { authMiddleware, validateData } from "../middlewares";
import { bookAppointment } from "../controllers";
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

export { appointmentRouter };
