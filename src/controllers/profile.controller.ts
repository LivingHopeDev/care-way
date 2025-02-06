import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { ProfileService } from "../services";

const profileService = new ProfileService();
export const updateProviderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { message } = await profileService.updateProfile(userId, req.body);

    res.status(200).json({ status: "success", message });
  }
);
