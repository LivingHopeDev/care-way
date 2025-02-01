import { BookAppointmentInput } from "../schema/appointment.schema";
import { prismaClient } from "..";
import { Conflict, ResourceNotFound, BadRequest } from "../middlewares";
export class AppointmentService {
  async bookAppointment(patientId: string, payload) {
    const {
      providerId,
      availabilityId,
      appointmentDate,
      startTime,
      endTime,
      reason,
    } = payload;

    const availability = await prismaClient.availability.findUnique({
      where: { id: availabilityId, providerId },
    });

    if (!availability) throw new ResourceNotFound("Availability not found");

    const overlappingAppointment = await prismaClient.appointment.findFirst({
      where: {
        providerId,
        appointmentDate: new Date(appointmentDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
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
        appointmentDate: new Date(appointmentDate),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        reason,
        status: "PENDING",
      },
    });
  }
}
