import { ProviderStatus } from "@prisma/client";
import { z } from "zod";

export const updateProviderStatusSchema = z.object({
  providerId: z.string().uuid(),
  status: z.nativeEnum(ProviderStatus),
});
