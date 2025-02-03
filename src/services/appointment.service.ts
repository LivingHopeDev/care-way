import { BookAppointmentInput } from "../schema/appointment.schema";
import { prismaClient } from "..";
import { Conflict, ResourceNotFound, BadRequest } from "../middlewares";
import { AppointmentStatus } from "@prisma/client";
import { paginate } from "../utils/paginate";
export class AppointmentService {
  // For Patients
  async bookAppointment(patientId: string, payload: BookAppointmentInput) {
    const {
      providerId,
      availabilityId,
      appointmentDate,
      startTime,
      endTime,
      reason,
    } = payload;
    const startDateTime = new Date(`${appointmentDate}T${startTime}:00.000Z`);
    const endDateTime = new Date(`${appointmentDate}T${endTime}:00.000Z`);

    const availability = await prismaClient.availability.findUnique({
      where: { id: availabilityId, providerId },
    });

    if (!availability) throw new ResourceNotFound("Availability not found");

    const overlappingAppointment = await prismaClient.appointment.findFirst({
      where: {
        providerId,
        appointmentDate: startDateTime,
        startTime: startDateTime,
        endTime: endDateTime,
      },
    });

    if (overlappingAppointment) {
      throw new BadRequest("Appointment slot already booked.");
    }

    return await prismaClient.appointment.create({
      data: {
        providerId,
        patientId,
        availabilityId,
        appointmentDate: startDateTime,
        startTime: startDateTime,
        endTime: endDateTime,
        reason,
      },
    });
  }
  async cancelAppointment(appointmentId: string, patientId: string) {
    const appointment = await prismaClient.appointment.findUnique({
      where: { id: appointmentId, patientId },
    });
    if (!appointment) throw new ResourceNotFound("Appointment not found");

    await prismaClient.appointment.update({
      where: { id: appointmentId },
      data: {
        status: "CANCELLED",
      },
    });

    return { message: "Appointment cancelled successfully" };
  }

  async getAppointmentsByPatient(
    patientId: string,
    query: {
      page: number;
      limit: number;
      orderBy?: string;
      orderDirection?: string;
    }
  ) {
    return await paginate(prismaClient.appointment, {
      where: { patientId },
      include: { availability: true, provider: true },
      page: Number(query.page),
      limit: Number(query.limit),
      orderBy: query.orderBy || "createdAt",
      orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
    });
  }

  async getAppointmentsByProvider(providerId: string, query) {
    return await paginate(prismaClient.appointment, {
      where: { providerId },
      include: { availability: true, patient: true },
      page: Number(query.page),
      limit: Number(query.limit),
      orderBy: query.orderBy || "createdAt",
      orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
    });
  }

  async getAppointmentById(
    appointmentId: string,
    userId: string,
    userRole: string
  ) {
    if (userRole === "ADMIN") {
      const appointment = await prismaClient.appointment.findUnique({
        where: { id: appointmentId },
        include: {
          availability: true,
          provider: true,
          patient: true,
        },
      });

      if (!appointment) {
        throw new ResourceNotFound("Appointment not found");
      }

      return appointment;
    }

    // For providers and patients
    const userRecord = await (userRole === "PROVIDER"
      ? prismaClient.provider.findUnique({ where: { userId } })
      : prismaClient.patient.findUnique({ where: { userId } }));

    if (!userRecord) {
      throw new ResourceNotFound("User record not found");
    }

    const appointment = await prismaClient.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        availability: true,
        provider: true,
        patient: true,
      },
    });

    if (!appointment) {
      throw new ResourceNotFound("Appointment not found");
    }

    if (userRole === "PROVIDER") {
      if (appointment.providerId !== userRecord.id) {
        throw new BadRequest("Unauthorized access to appointment");
      }
    } else if (userRole === "PATIENT") {
      if (appointment.patientId !== userRecord.id) {
        throw new BadRequest("Unauthorized access to appointment");
      }
    } else {
      throw new BadRequest("Invalid user role");
    }

    return appointment;
  }

  // For Providers
  async acceptOrRejectAppointment(
    appointmentId: string,
    providerId: string,
    status: AppointmentStatus
  ) {
    const appointment = await prismaClient.appointment.findUnique({
      where: { id: appointmentId, providerId },
    });
    if (!appointment) throw new ResourceNotFound("Appointment not found");

    await prismaClient.appointment.update({
      where: { id: appointmentId },
      data: {
        status,
      },
    });

    return {
      message: `Appointment ${status.toLowerCase()} successfully`,
    };
  }
  // Delete an appointment (ADMIN Privilege)

  async deleteAppointment(appointmentId: string) {
    const appointment = await prismaClient.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) throw new ResourceNotFound("Appointment not found");

    await prismaClient.appointment.delete({ where: { id: appointmentId } });

    return { message: "Appointment deleted successfully" };
  }
}
