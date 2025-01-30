import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { AppointmentService } from "../services";

const appointmentService = new AppointmentService();
export const bookAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const patient = req.patient.id;

    // const { appointment, message } = await appointmentService.bookAppointment(
    //   patient,
    //   payload
    // );

    // res.status(201).json({
    //   status: "success",
    //   message,
    //   data: appointment,
    // });
  }
);
