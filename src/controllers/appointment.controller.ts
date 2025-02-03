import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { AppointmentService } from "../services";

const appointmentService = new AppointmentService();
export const bookAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.patient.id;
    const appointment = await appointmentService.bookAppointment(
      patientId,
      req.body
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);
export const cancelAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.patient.id;
    const appointmentId = req.params.id as string;
    const appointment = await appointmentService.cancelAppointment(
      appointmentId,
      patientId
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);
