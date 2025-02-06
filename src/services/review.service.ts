import { prismaClient } from "..";
import { ResourceNotFound } from "../middlewares";

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
}
