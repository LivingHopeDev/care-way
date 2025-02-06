import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import { getAllProviders } from "../controllers";
const providerRouter: Router = Router();

providerRouter.get(
  "/approved",
  authMiddleware,
  adminMiddleware,
  getAllProviders
);

providerRouter.get("/all", authMiddleware, adminMiddleware, getAllProviders);

export { providerRouter };
