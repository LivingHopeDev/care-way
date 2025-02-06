import { ProviderStatus } from "@prisma/client";
import { prismaClient } from "..";
import { ResourceNotFound, Unauthorised } from "../middlewares";
import { paginate } from "../utils/paginate";
export class ProviderService {
  public async getAllProviders(
    query: {
      page: number;
      limit: number;
      orderBy?: string;
      orderDirection?: string;
    },
    role: string
  ) {
    if (role === "PATIENT") {
      return await paginate(prismaClient.provider, {
        where: { status: "APPROVED" },
        include: {
          user: true,
        },
        page: Number(query.page),
        limit: Number(query.limit),
        orderBy: query.orderBy || "createdAt",
        orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
      });
    } else if (role === "ADMIN") {
      return await paginate(prismaClient.provider, {
        where: {},
        include: { user: true },
        page: Number(query.page),
        limit: Number(query.limit),
        orderBy: query.orderBy || "createdAt",
        orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
      });
    } else {
      throw new Unauthorised("You are not authorised: Login as a patient");
    }
  }
  public async updateProviderStatus(payload: {
    status: ProviderStatus;
    providerId: string;
  }) {
    const { status, providerId } = payload;
    const provider = await prismaClient.provider.findUnique({
      where: { id: providerId },
    });
    if (!provider) {
      throw new ResourceNotFound("Provider not found.");
    }

    await prismaClient.provider.update({
      where: {
        id: providerId,
      },
      data: {
        status,
      },
    });
    return {
      message: "Provider status updated.",
    };
  }
}
