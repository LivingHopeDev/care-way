import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ProviderService } from "../services";

const providerService = new ProviderService();
export const getAllProviders = asyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, orderBy, orderDirection } = req.query;
    const { role } = req.user;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const provider = await providerService.getAllProviders(query, role);

    res.status(200).json({ status: "success", data: provider });
  }
);

export const updateProviderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { message } = await providerService.updateProviderStatus(req.body);

    res.status(200).json({ status: "success", message });
  }
);
