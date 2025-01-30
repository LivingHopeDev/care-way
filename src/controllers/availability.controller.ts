import asyncHandler from "../middlewares/asyncHandler";
import { Unauthenticated } from "../middlewares";
import { Request, Response } from "express";
import { AvailabilityService } from "../services/availability.service";
import { number } from "zod";

const availabilityService = new AvailabilityService();

export const createAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.provider.id;

    const { message } = await availabilityService.createAvailability(
      providerId,
      req.body
    );

    res.status(201).json({
      status: "success",
      message,
    });
  }
);

export const getAvailabilities = asyncHandler(
  async (req: Request, res: Response) => {
    const providerId = req.provider.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: (orderBy as string) || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const availabilities = await availabilityService.getAvailabilities(
      providerId,
      query
    );

    res.status(200).json({
      status: "success",
      data: availabilities,
    });
  }
);

export const getAvailabilityById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const availability = await availabilityService.getAvailabilityById(id);

    res.status(200).json({
      status: "success",
      data: availability,
    });
  }
);

export const updateAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const providerId = req.provider.id;

    const updatedAvailability = await availabilityService.updateAvailability(
      id,
      providerId,
      req.body
    );

    res.status(200).json({
      status: "success",
      data: updatedAvailability,
    });
  }
);

export const deleteAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await availabilityService.deleteAvailability(id);

    res.status(200).json({
      status: "success",
      message,
    });
  }
);
