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

export const getAllReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const reviews = await reviewService.getAllReview(query);

    res.status(200).json({ status: "success", data: reviews });
  }
);

export const getProviderReviews = asyncHandler(
  async (req: Request, res: Response) => {
    const { providerId } = req.params;
    const { page, limit, orderBy, orderDirection } = req.query;

    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const reviews = await reviewService.getProviderReviews(query, providerId);

    res.status(200).json({ status: "success", data: reviews });
  }
);
