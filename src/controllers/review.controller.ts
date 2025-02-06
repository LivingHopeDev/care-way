import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ReviewService } from "../services";

const reviewService = new ReviewService();
export const createReview = asyncHandler(
  async (req: Request, res: Response) => {
    const patientId = req.patient.id;
    const { message } = await reviewService.createReview(patientId, req.body);

    res.status(201).json({ status: "success", message });
  }
);
