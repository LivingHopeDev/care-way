import { BookAppointmentInput } from "../schema/appointment.schema";
import { prismaClient } from "..";
import { Conflict, ResourceNotFound } from "../middlewares";
export class AppointmentService {
  public async bookAppointment(providerId: string, payload: BookAppointmentInput) {
    // Check if availability exists and is not booked
    const { reason, availabilityId } = payload;
    const availability = await prismaClient.availability.findUnique({
      where: { id: availabilityId },
      include: { appointments: true },
    });

    if (!availability) {
      throw new ResourceNotFound("Time slot not found");
    }

    if (availability.appointments.length > 0) {
      throw new Conflict("This time slot is already booked");
    }

    // const appointment = await prismaClient.appointment.create({
    //   data: {
    //     providerId,
    //     availabilityId: availabilityId,
    //     reason: reason,
    //   },
    //   include: {
    //     availability: {
    //       include: { provider: true },
    //     },
    //   },
    // });

    // return { message: "Appointment booked successfully", appointment };
  }
}
