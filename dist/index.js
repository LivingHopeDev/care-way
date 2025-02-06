"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const client_1 = require("@prisma/client");
const middlewares_1 = require("./middlewares");
const logger_1 = __importDefault(require("./utils/logger"));
const swagger_ui_express_1 = require("swagger-ui-express");
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const config_1 = __importDefault(require("./config"));
const bullBoard_1 = __importDefault(require("./config/bullBoard"));
const app = (0, express_1.default)();
const port = config_1.default.PORT;
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, cors_1.default)());
app.get("/api", (req, res) => {
    res.json({
        status: "success",
        message: "Welcome to careWay: I will be responding to your requests",
    });
});
app.use("/api/docs", swagger_ui_express_1.serve, (0, swagger_ui_express_1.setup)(swaggerConfig_1.default));
app.get("/api/queues/:passkey", (req, res) => {
    if (req.params.passkey !== process.env.BULL_PASSKEY) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    bullBoard_1.default.getRouter()(req, res);
});
app.use("/api/v1", routes_1.default);
exports.prismaClient = new client_1.PrismaClient({
    log: ["query"],
});
app.use(middlewares_1.errorHandler);
app.use(middlewares_1.routeNotFound);
app.listen(port, () => {
    logger_1.default.info(`Server is listening on port ${port}`);
});
