import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ProviderService } from "../services";

const providerService = new ProviderService();
export const getAllProviders = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const { data, pagination } = await providerService.getAllProviders(query);

    res.status(201).json({ status: "success", data, pagination });
  }
);
