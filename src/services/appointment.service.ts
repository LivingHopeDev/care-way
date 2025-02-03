import { BookAppointmentInput } from "../schema/appointment.schema";
import { prismaClient } from "..";
import { Conflict, ResourceNotFound, BadRequest } from "../middlewares";
import { AppointmentStatus } from "@prisma/client";
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
