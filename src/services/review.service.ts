import { prismaClient } from "..";
import { ResourceNotFound } from "../middlewares";
import { paginate } from "../utils/paginate";
export class ReviewService {
  public async createReview(
    patientId: string,
    payload: {
      feedback: string;
      rating: number;
      providerId: string;
    }
  ) {
    const { providerId } = payload;
    const provider = await prismaClient.provider.findFirst({
      where: { id: providerId },
    });
    if (!provider) {
      throw new ResourceNotFound("Provider not found.");
    }

    await prismaClient.review.create({
      data: {
        ...payload,
        patientId,
      },
    });
    return {
      message: "Review submitted.",
    };
  }

  public async getAllReview(query: {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: string;
  }) {
    return await paginate(prismaClient.review, {
      where: {},
      include: {
        patient: true,
        provider: true,
      },
      page: Number(query.page),
      limit: Number(query.limit),
      orderBy: query.orderBy || "createdAt",
      orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
    });
  }

  public async getProviderReviews(
    query: {
      page: number;
      limit: number;
      orderBy?: string;
      orderDirection?: string;
    },
    providerId: string
  ) {
    return await paginate(prismaClient.review, {
      where: { providerId },
      include: {
        patient: true,
        provider: true,
      },
      page: Number(query.page),
      limit: Number(query.limit),
      orderBy: query.orderBy || "createdAt",
      orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
    });
  }
}
