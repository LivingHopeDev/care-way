import { prismaClient } from "..";
import { paginate } from "../utils/paginate";
export class ProviderService {
  public async getAllProviders(query: {
    page: number;
    limit: number;
    orderBy?: string;
    orderDirection?: string;
  }) {
    return await paginate(prismaClient.provider, {
      where: {},
      include: { user: true },
      page: Number(query.page),
      limit: Number(query.limit),
      orderBy: query.orderBy || "createdAt",
      orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
    });
  }
}
