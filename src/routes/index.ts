import { Router } from "express";
import { authRouter } from "./auth.routes";
import { appointmentRouter } from "./appointment.routes";
import { availabilityRouter } from "./availability.routes";
import { providerRouter } from "./provider.routes";
import { reviewRouter } from "./review.routes";
const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/appointments", appointmentRouter);
rootRouter.use("/availabilities", availabilityRouter);
rootRouter.use("/providers", providerRouter);
rootRouter.use("/reviews", reviewRouter);

export default rootRouter;
