"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const middlewares_1 = require("../middlewares");
const __1 = require("..");
const paginate_1 = require("../utils/paginate");
class AvailabilityService {
    constructor() {
        this.createAvailability = (providerId, payload) => __awaiter(this, void 0, void 0, function* () {
            yield __1.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                for (const slot of payload.timeSlots) {
                    const startDateTime = new Date(`${slot.date}T${slot.startTime}:00.000Z`);
                    const endDateTime = new Date(`${slot.date}T${slot.endTime}:00.000Z`);
                    if (startDateTime >= endDateTime) {
                        throw new middlewares_1.BadRequest(`Invalid time range for ${slot.date}`);
                    }
                    // Check if availability already exists for the same date
                    const existingSlot = yield prisma.availability.findFirst({
                        where: {
                            providerId,
                            date: startDateTime,
                        },
                    });
                    if (existingSlot) {
                        throw new middlewares_1.Conflict(`Availability already exists for ${slot.date}`);
                    }
                    // Create new availability
                    yield prisma.availability.create({
                        data: {
                            providerId,
                            date: startDateTime,
                            startTime: startDateTime,
                            endTime: endDateTime,
                        },
                    });
                }
            }));
            return { message: "Availability created successfully" };
        });
    }
    getAvailabilities(providerId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, paginate_1.paginate)(__1.prismaClient.availability, {
                where: { providerId },
                page: Number(query.page),
                limit: Number(query.limit),
                orderBy: query.orderBy || "createdAt",
                orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
            });
            return {
                data: result.data,
                pagination: {
                    totalCount: result.totalCount,
                    totalPages: result.totalPages,
                    currentPage: result.page,
                    limit: result.limit,
                },
            };
        });
    }
    getAvailabilityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield __1.prismaClient.availability.findUnique({
                where: { id },
            });
            if (!availability)
                throw new middlewares_1.ResourceNotFound("Availability not found");
            return availability;
        });
    }
    updateAvailability(id, providerId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { date, startTime, endTime } = payload;
            const availability = yield __1.prismaClient.availability.findUnique({
                where: { id, providerId },
            });
            if (!availability)
                throw new middlewares_1.ResourceNotFound("Availability not found");
            return yield __1.prismaClient.availability.update({
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
        });
    }
    deleteAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const availability = yield __1.prismaClient.availability.findUnique({
                where: { id },
            });
            if (!availability)
                throw new middlewares_1.ResourceNotFound("Availability not found");
            yield __1.prismaClient.availability.delete({ where: { id } });
            return { message: "Availability deleted successfully" };
        });
    }
}
exports.AvailabilityService = AvailabilityService;
