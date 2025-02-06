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
exports.ReviewService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
const paginate_1 = require("../utils/paginate");
class ReviewService {
    createReview(patientId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { providerId } = payload;
            const provider = yield __1.prismaClient.provider.findFirst({
                where: { id: providerId },
            });
            if (!provider) {
                throw new middlewares_1.ResourceNotFound("Provider not found.");
            }
            yield __1.prismaClient.review.create({
                data: Object.assign(Object.assign({}, payload), { patientId }),
            });
            return {
                message: "Review submitted.",
            };
        });
    }
    getAllReview(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, paginate_1.paginate)(__1.prismaClient.review, {
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
        });
    }
    getProviderReviews(query, providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, paginate_1.paginate)(__1.prismaClient.review, {
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
        });
    }
}
exports.ReviewService = ReviewService;
