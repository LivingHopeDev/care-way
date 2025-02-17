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
exports.updateProviderStatus = exports.getAllProviders = void 0;
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const services_1 = require("../services");
const providerService = new services_1.ProviderService();
exports.getAllProviders = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, orderBy, orderDirection } = req.query;
    const { role } = req.user;
    const query = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        orderBy: orderBy || "createdAt",
        orderDirection: orderDirection === "asc" ? "asc" : "desc",
    };
    const provider = yield providerService.getAllProviders(query, role);
    res.status(200).json({ status: "success", data: provider });
}));
exports.updateProviderStatus = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = yield providerService.updateProviderStatus(req.body);
    res.status(200).json({ status: "success", message });
}));
