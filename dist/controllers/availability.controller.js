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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvailability = exports.updateAvailability = exports.getAvailabilityById = exports.getAvailabilities = exports.createAvailability = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const availability_service_1 = require("../services/availability.service");
const availabilityService = new availability_service_1.AvailabilityService();
exports.createAvailability = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.provider.id;
    const { message } = yield availabilityService.createAvailability(providerId, req.body);
    res.status(201).json({
        status: "success",
        message,
    });
}));
exports.getAvailabilities = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const providerId = req.provider.id;
    const { page, limit, orderBy, orderDirection } = req.query;
    const query = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        orderBy: orderBy || "createdAt",
        orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const availabilities = yield availabilityService.getAvailabilities(providerId, query);
    res.status(200).json({
        status: "success",
        data: availabilities,
    });
}));
exports.getAvailabilityById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const availability = yield availabilityService.getAvailabilityById(id);
    res.status(200).json({
        status: "success",
        data: availability,
    });
}));
exports.updateAvailability = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const providerId = req.provider.id;
    const updatedAvailability = yield availabilityService.updateAvailability(id, providerId, req.body);
    res.status(200).json({
        status: "success",
        data: updatedAvailability,
    });
}));
exports.deleteAvailability = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { message } = yield availabilityService.deleteAvailability(id);
    res.status(200).json({
        status: "success",
        message,
    });
}));
