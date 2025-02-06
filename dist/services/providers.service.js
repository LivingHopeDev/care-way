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
exports.ProviderService = void 0;
const __1 = require("..");
const middlewares_1 = require("../middlewares");
const paginate_1 = require("../utils/paginate");
class ProviderService {
    getAllProviders(query, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "PATIENT") {
                return yield (0, paginate_1.paginate)(__1.prismaClient.provider, {
                    where: { status: "APPROVED" },
                    include: {
                        user: true,
                    },
                    page: Number(query.page),
                    limit: Number(query.limit),
                    orderBy: query.orderBy || "createdAt",
                    orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
                });
            }
            else if (role === "ADMIN") {
                return yield (0, paginate_1.paginate)(__1.prismaClient.provider, {
                    where: {},
                    include: { user: true },
                    page: Number(query.page),
                    limit: Number(query.limit),
                    orderBy: query.orderBy || "createdAt",
                    orderDirection: query.orderDirection === "asc" ? "asc" : "desc",
                });
            }
            else {
                throw new middlewares_1.Unauthorised("You are not authorised: Login as a patient");
            }
        });
    }
    updateProviderStatus(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, providerId } = payload;
            const provider = yield __1.prismaClient.provider.findUnique({
                where: { id: providerId },
            });
            if (!provider) {
                throw new middlewares_1.ResourceNotFound("Provider not found.");
            }
            yield __1.prismaClient.provider.update({
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
        });
    }
}
exports.ProviderService = ProviderService;
