import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import { getAllProviders, updateProviderStatus } from "../controllers";
import { updateProviderStatusSchema } from "../schema/provider.schema";
const providerRouter: Router = Router();

providerRouter.get("/", authMiddleware, getAllProviders);
providerRouter.patch(
  "/",
  validateData(updateProviderStatusSchema),
  authMiddleware,
  updateProviderStatus
);

export { providerRouter };
