import { optional, z } from "zod";

export const bookAppointmentSchema = z.object({
  providerId: z.string().uuid(),
  availabilityId: z.string().uuid(),
  appointmentDate: z.string(),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),

  reason: z.string(),
});
export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;
