import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "@prisma/client";
import log from "../utils/logger";
import { ServerError, ResourceNotFound } from "./error";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request & { user?: User },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        status_code: "401",
        message: "Invalid token ",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        status_code: "401",
        message: "Invalid token ",
      });
      return;
    }

    jwt.verify(token, config.TOKEN_SECRET!, async (err, decoded: any) => {
      if (err) {
        res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
        return;
      }
      const session = await prismaClient.session.findFirst({
        where: { sessionToken: token },
      });
      if (!session || new Date() > session.expiresAt) {
        return res.status(401).json({
          status_code: "401",
          message: "Session expired or invalid",
        });
      }
      const user = await prismaClient.user.findFirst({
        where: { id: decoded["userId"] as string },
      });
      if (!user) {
        res.status(401).json({
          status_code: "401",
          message: "Invalid token",
        });
        return;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    log.error(error);
    throw new ServerError("INTERNAL_SERVER_ERROR");
  }
};
export const providerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  // Fetch the provider record
  const provider = await prismaClient.provider.findUnique({
    where: { userId: user.id },
  });

  if (!provider) {
    res.status(401).json({
      status_code: "401",
      message: "Invalid token",
    });
    return;
  }
  // Check if the user is a provider
  if (user.role !== "PROVIDER") {
    res.status(403).json({
      status_code: "403",
      message: "Unauthorized: Providers only",
    });
    return;
  }

  // Attach the provider to the request object
  req.provider = provider;

  next();
};
export const patientMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  // Fetch the patient record
  const patient = await prismaClient.patient.findUnique({
    where: { userId: user.id },
  });

  if (!patient) {
    res.status(401).json({
      status_code: "401",
      message: "Invalid token",
    });
    return;
  }
  if (user.role !== "PATIENT") {
    res.status(403).json({
      status_code: "403",
      message: "Unauthorized: Patients only",
    });
    return;
  }
  // Attach the patient to the request object
  req.patient = patient;
  next();
};
export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({
      status_code: "403",
      message: "Unauthorized",
    });
    return;
  }
};
