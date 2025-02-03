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

export const getAppointmentsByPatient = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.patient.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const appointment = await appointmentService.getAppointmentsByPatient(
      patientId,
      query
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);

// For providers
export const acceptOrRejectAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.provider.id;
    const appointmentId = req.params.id as string;
    const { status } = req.body;
    const appointment = await appointmentService.acceptOrRejectAppointment(
      appointmentId,
      providerId,
      status
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);

export const getAppointmentsByProvider = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.provider.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const appointment = await appointmentService.getAppointmentsByProvider(
      providerId,
      query
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);

// For Admins
export const deleteAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id as string;
    const appointment = await appointmentService.deleteAppointment(
      appointmentId
    );

    res.status(201).json({ status: "success", data: appointment });
  }
);
