import { Router } from "express";
import {
  adminMiddleware,
  authMiddleware,
  patientMiddleware,
  validateData,
} from "../middlewares";
import { createReview, getAllReviews } from "../controllers";
import { createReviewSchema } from "../schema/review.schema";
const reviewRouter: Router = Router();

reviewRouter.post(
  "/",
  validateData(createReviewSchema),
  authMiddleware,
  patientMiddleware,
  createReview
);
reviewRouter.get("/", authMiddleware, adminMiddleware, getAllReviews);
reviewRouter.get(
  "/:providerId",
  authMiddleware,
  patientMiddleware,
  getAllReviews
);

export { reviewRouter };
