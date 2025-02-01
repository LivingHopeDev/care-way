import { Router } from "express";
import { authRouter } from "./auth.routes";
import { appointmentRouter } from "./appointment.routes";
import { availabilityRouter } from "./availability.routes";
import { providerRouter } from "./provider.routes";
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/appointment", appointmentRouter);
rootRouter.use("/availability", availabilityRouter);
rootRouter.use("/provider", providerRouter);

export default rootRouter;
