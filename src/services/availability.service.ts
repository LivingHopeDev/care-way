import {
  CreateAvailabilityInput,
  UpdateAvailabilityInput,
} from "../schema/availability.schema";
import { BadRequest, Conflict, ResourceNotFound } from "../middlewares";
import { prismaClient } from "..";
import { paginate } from "../utils/paginate";
export class AvailabilityService {
  createAvailability = async (
    providerId: string,
    payload: CreateAvailabilityInput
  ) => {
    await prismaClient.$transaction(async (prisma) => {
      for (const slot of payload.timeSlots) {
        const startDateTime = new Date(
          `${slot.date}T${slot.startTime}:00.000Z`
        );
        const endDateTime = new Date(`${slot.date}T${slot.endTime}:00.000Z`);

        if (startDateTime >= endDateTime) {
          throw new BadRequest(`Invalid time range for ${slot.date}`);
        }

        // Check if availability already exists for the same date
        const existingSlot = await prisma.availability.findFirst({
          where: {
            providerId,
            date: startDateTime,
          },
        });

        if (existingSlot) {
          throw new Conflict(`Availability already exists for ${slot.date}`);
        }

        // Create new availability
        await prisma.availability.create({
          data: {
            providerId,
            date: startDateTime,
            startTime: startDateTime,
            endTime: endDateTime,
          },
        });
      }
    });

    return { message: "Availability created successfully" };
  };

  public async getAvailabilities(
    providerId: string,
    query: {
      page: number;
      limit: number;
      orderBy?: string;
      orderDirection?: string;
    }
  ) {
    const { page, limit, orderBy, orderDirection } = query;

    const {
      take,
      skip,
      orderBy: sortOrder,
      totalCount,
      totalPages,
    } = await paginate(prismaClient.availability, {
      page: Number(page),
      limit: Number(limit),
      orderBy: orderBy || "createdAt",
      orderDirection: orderDirection === "asc" ? "asc" : "desc",
    });

    const availabilities = await prismaClient.availability.findMany({
      where: {
        providerId,
      },
      take,
      skip,
      orderBy: sortOrder,
    });

    return {
      data: availabilities,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }

  public async getAvailabilityById(id: string) {
    const availability = await prismaClient.availability.findUnique({
      where: { id },
    });

    if (!availability) throw new ResourceNotFound("Availability not found");

    return availability;
  }
  public async updateAvailability(
    id: string,
    providerId: string,
    payload: UpdateAvailabilityInput
  ) {
    const { date, startTime, endTime } = payload;
    const availability = await prismaClient.availability.findUnique({
      where: { id, providerId },
    });
    if (!availability) throw new ResourceNotFound("Availability not found");

    return await prismaClient.availability.update({
      where: { id },
      data: {
        date: date ? new Date(date) : availability.date,
        startTime: startTime
          ? new Date(`${date}T${startTime}:00.000Z`)
          : availability.startTime,
        endTime: endTime
          ? new Date(`${date}T${endTime}:00.000Z`)
          : availability.endTime,
      },
    });
  }

  public async deleteAvailability(id: string) {
    const availability = await prismaClient.availability.findUnique({
      where: { id },
    });

    if (!availability) throw new ResourceNotFound("Availability not found");

    await prismaClient.availability.delete({ where: { id } });

    return { message: "Availability deleted successfully" };
  }
}
