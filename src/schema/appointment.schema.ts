import { optional, z } from "zod";

export const bookAppointmentSchema = z.object({
  availabilityId: z.string().uuid("Invalid availability ID"),
  reason: z.string().min(5, "Please provide a reason for the appointment"),
});
export type BookAppointmentInput = z.infer<typeof bookAppointmentSchema>;
