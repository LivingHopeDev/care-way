import { Router } from "express";
import {
  authMiddleware,
  providerMiddleware,
  validateData,
} from "../middlewares";
import {
  createAvailability,
  getAvailabilities,
  getAvailabilityById,
  deleteAvailability,
  updateAvailability,
} from "../controllers";
import { createAvailabilitySchema } from "../schema/availability.schema";

const availabilityRouter: Router = Router();

availabilityRouter.post(
  "/",
  authMiddleware,
  providerMiddleware,
  validateData(createAvailabilitySchema),
  createAvailability
);

availabilityRouter.get(
  "/",
  authMiddleware,
  providerMiddleware,
  getAvailabilities
);
availabilityRouter.get("/:id", authMiddleware, getAvailabilityById);
availabilityRouter.patch(
  "/:id",
  authMiddleware,
  providerMiddleware,
  updateAvailability
);
availabilityRouter.delete(
  "/:id",
  authMiddleware,
  providerMiddleware,
  deleteAvailability
);

export { availabilityRouter };
