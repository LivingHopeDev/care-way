import { prismaClient } from "..";
import { paginate } from "../utils/paginate";
export class ProviderService {
  public async getAllProviders(query: {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: string;
  }) {
    const { page, limit, orderBy, orderDirection } = query;

    const {
      take,
      skip,
      orderBy: sortOrder,
      totalCount,
      totalPages,
    } = await paginate(prismaClient.provider, {
      page: Number(page),
      limit: Number(limit),
      orderBy: orderBy || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    });

    const providers = await prismaClient.provider.findMany({
      where: {},
      take,
      skip,
      orderBy: sortOrder,
    });

    return {
      data: providers,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }
}
