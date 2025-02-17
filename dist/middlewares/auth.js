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
exports.adminMiddleware = exports.patientMiddleware = exports.providerMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const logger_1 = __importDefault(require("../utils/logger"));
const error_1 = require("./error");
const __1 = require("..");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                status_code: "401",
                message: "Invalid token ",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                status_code: "401",
                message: "Invalid token ",
            });
            return;
        }
        jsonwebtoken_1.default.verify(token, config_1.default.TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({
                    status_code: "401",
                    message: "Invalid token",
                });
                return;
            }
            const session = yield __1.prismaClient.session.findFirst({
                where: { sessionToken: token },
            });
            if (!session || new Date() > session.expiresAt) {
                return res.status(401).json({
                    status_code: "401",
                    message: "Session expired or invalid",
                });
            }
            const user = yield __1.prismaClient.user.findFirst({
                where: { id: decoded["userId"] },
            });
            if (!user) {
                res.status(401).json({
                    status_code: "401",
                    message: "Invalid token",
                });
                return;
            }
            req.user = user;
            next();
        }));
    }
    catch (error) {
        logger_1.default.error(error);
        throw new error_1.ServerError("INTERNAL_SERVER_ERROR");
    }
});
exports.authMiddleware = authMiddleware;
const providerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // Fetch the provider record
    const provider = yield __1.prismaClient.provider.findUnique({
        where: { userId: user.id },
    });
    if (!provider) {
        res.status(401).json({
            status_code: "401",
            message: "Invalid token",
        });
        return;
    }
    // Check if the user is a provider
    if (user.role !== "PROVIDER") {
        res.status(403).json({
            status_code: "403",
            message: "Unauthorized: Providers only",
        });
        return;
    }
    // Attach the provider to the request object
    req.provider = provider;
    next();
});
exports.providerMiddleware = providerMiddleware;
const patientMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    // Fetch the patient record
    const patient = yield __1.prismaClient.patient.findUnique({
        where: { userId: user.id },
    });
    if (!patient) {
        res.status(401).json({
            status_code: "401",
            message: "Invalid token",
        });
        return;
    }
    if (user.role !== "PATIENT") {
        res.status(403).json({
            status_code: "403",
            message: "Unauthorized: Patients only",
        });
        return;
    }
    // Attach the patient to the request object
    req.patient = patient;
    next();
});
exports.patientMiddleware = patientMiddleware;
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.role === "ADMIN") {
        next();
    }
    else {
        res.status(403).json({
            status_code: "403",
            message: "Unauthorized",
        });
        return;
    }
});
exports.adminMiddleware = adminMiddleware;
