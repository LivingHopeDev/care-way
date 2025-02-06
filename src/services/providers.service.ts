import { prismaClient } from "..";
import { Unauthorised } from "../middlewares";
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
}
