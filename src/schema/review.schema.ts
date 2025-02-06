import { z } from "zod";

export const createReviewSchema = z.object({
  providerId: z.string().uuid(),
  feedback: z.string(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be 5 or less" }),
});
