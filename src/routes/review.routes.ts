import { Router } from "express";
import {
  adminMiddleware,
  authMiddleware,
  patientMiddleware,
  validateData,
} from "../middlewares";
import { createReview } from "../controllers";
import { createReviewSchema } from "../schema/review.schema";
const reviewRouter: Router = Router();

reviewRouter.post(
  "/",
  validateData(createReviewSchema),
  authMiddleware,
  patientMiddleware,
  createReview
);

export { reviewRouter };
