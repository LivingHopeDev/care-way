import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { AppointmentService } from "../services";
import { error } from "console";
import { BadRequest } from "../middlewares";

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
    if (!appointmentId) {
      throw new BadRequest("Appointment ID is required");
    }
    const appointment = await appointmentService.cancelAppointment(
      appointmentId,
      patientId
    );

    res.status(200).json({ status: "success", data: appointment });
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

    res.status(200).json({ status: "success", data: appointment });
  }
);

// For providers
export const acceptOrRejectAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.provider.id;
    const appointmentId = req.params.id as string;
    if (!appointmentId) {
      throw new BadRequest("Appointment ID is required");
    }
    const { status } = req.body;
    const appointment = await appointmentService.acceptOrRejectAppointment(
      appointmentId,
      providerId,
      status
    );

    res.status(200).json({ status: "success", data: appointment });
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

    res.status(200).json({ status: "success", data: appointment });
  }
);
export const getAppointmentById = asyncHandler(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!appointmentId) {
      return res.status(400).json({
        status_code: "400",
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentService.getAppointmentById(
      appointmentId,
      userId,
      userRole
    );

    return res.status(200).json({
      status: "success",
      data: appointment,
    });
  }
);
// For Admins
export const deleteAppointment = asyncHandler(
  async (req: Request, res: Response) => {
    const appointmentId = req.params.id as string;
    const appointment = await appointmentService.deleteAppointment(
      appointmentId
    );

    res.status(200).json({ status: "success", data: appointment });
  }
);
