import { z } from "zod";

const timeSlotSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:mm format"),
});

export const createAvailabilitySchema = z.object({
  timeSlots: z
    .array(timeSlotSchema)
    .min(1, "At least one time slot is required")
    .max(7, "You can create a maximum of 7 time slots at once"),
});

export const updateAvailabilitySchema = z.object({
  date: z.string().optional(), // Optional since the provider might only want to update time
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid time format. Use HH:mm"
    )
    .optional(),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid time format. Use HH:mm"
    )
    .optional(),
});

export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;

export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>;
