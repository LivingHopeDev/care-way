import { Router } from "express";
import { adminMiddleware, authMiddleware, validateData } from "../middlewares";
import { getAllProviders } from "../controllers";
const providerRouter: Router = Router();

providerRouter.get("/", authMiddleware, getAllProviders);

export { providerRouter };
